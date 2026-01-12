import React, { useState } from "react";
import CartInput from "../components/CartInput";
import Receipt from "../components/Receipt";
import { calculateCart } from "../api/dvdService"; 
import { Disc3, Home } from "lucide-react"; 

function Dashboard({ onLogout }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalculate = async (text) => {
    setLoading(true);
    setError(null);
    try {
      const data = await calculateCart(text);
      setResult(data);
    } catch (err) {
      setError("Unable to calculate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg shadow-blue-200">
                <Disc3 size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  DVD Store Manager
                </h1>
                <p className="text-xs text-gray-500">
                  Calculate your cart total instantly
                </p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Home size={18} />
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm flex items-start gap-2">
            <span className="text-red-500 font-bold">!</span>
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CartInput onCalculate={handleCalculate} isLoading={loading} />
          <Receipt data={result} />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;