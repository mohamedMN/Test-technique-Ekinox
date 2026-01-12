import React from "react";
import { Disc3, Sparkles } from "lucide-react";

// Prix constants pour les DVDs
const PRICE_BTTF = 15;
const PRICE_OTHER = 20;

function Receipt({ data }) {
  if (!data) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center text-center h-full">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <Disc3 className="text-gray-400" size={32} />
        </div>
        <p className="text-gray-500 font-medium">No receipt yet</p>
        <p className="text-gray-400 text-sm mt-1">
          Add items and calculate to see your total
        </p>
      </div>
    );
  }

  const { total_price, details } = data;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Receipt</h2>
      </div>

      {/* Items */}
      <div className="space-y-3 mb-6">
        {/* BTTF Uniques (avec réduction) */}
        {details.unique_bttf_count > 0 && (
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 text-sm">
              BTTF Unique DVDs
              <span className="text-gray-400 ml-1">
                ×{details.unique_bttf_count}
              </span>
              <span className="text-green-500 ml-1 text-xs">
                (with discount)
              </span>
            </span>
            <span className="font-mono text-sm text-gray-900">
              ${(details.unique_bttf_count * PRICE_BTTF).toFixed(2)}
            </span>
          </div>
        )}

        {/* Autres films */}
        {details.others_count > 0 && (
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 text-sm">
              Other DVDs
              <span className="text-gray-400 ml-1">
                ×{details.others_count}
              </span>
            </span>
            <span className="font-mono text-sm text-gray-900">
              ${(details.others_count * PRICE_OTHER).toFixed(2)}
            </span>
          </div>
        )}

        {/* Réduction */}
        {details.saved_amount > 0 && (
          <div className="flex justify-between items-center py-2 text-green-600">
            <span className="text-sm flex items-center gap-1">
              <Sparkles size={14} />
              Discount ({details.discount_applied})
            </span>
            <span className="font-mono text-sm">
              -${details.saved_amount.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-semibold">Total</span>
          <span className="text-2xl font-bold text-blue-600 font-mono">
            ${total_price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Info bulle */}
      {details.unique_bttf_count >= 2 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg">
          <p className="text-xs text-green-700">
            🎉 You saved ${details.saved_amount.toFixed(2)} with{" "}
            {details.unique_bttf_count} unique BTTF titles!
          </p>
        </div>
      )}
    </div>
  );
}

export default Receipt;
