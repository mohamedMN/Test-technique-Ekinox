import React, { useState } from "react";
import {
  Sparkles,
  ShoppingCart,
  Package,
  Zap,
  Layers,
  Star,
  Trophy,
  Gift,
} from "lucide-react";

const PRESETS = {
  basic: {
    label: "Saga Complète",
    icon: Package,
    color: "blue",
    content: "Back to the Future 1\nBack to the Future 2\nBack to the Future 3",
    // Calcul: (3 * 15€) * 0.8 = 36€
  },
  promo: {
    label: "Mix Promo (2 diff.)",
    icon: Zap,
    color: "green",
    content: "Back to the Future 1\nBack to the Future 2\nAvatar",
    // Calcul: (2 * 15€ * 0.9) + 20€ = 47€
  },
  complex: {
    label: "Exemple n°5 (Doublon + Autre)",
    icon: Layers,
    color: "purple",
    content:
      "Back to the Future 1\nBack to the Future 2\nBack to the Future 2\nLa Chèvre",
    // Calcul: 2 diff -> 10% sur les 3 BTTF.
    // ((3 * 15€) * 0.8) + 20€ = 56€
  },
  noDiscount: {
    label: "Sans Réduction (Même volet)",
    icon: Star,
    color: "gray",
    content: "Back to the Future 1\nAvatar\nthe Joker",
    // Calcul: 1 seul volet unique -> 0% de réduction.
    // (1 * 15€) + 2 *20€  = 55€
  },
  maxDiscount: {
    label: "Exemple n°4 (Max Réduction)",
    icon: Trophy,
    color: "yellow",
    content:
      "Back to the Future 1\nBack to the Future 2\nBack to the Future 3\nBack to the Future 2",
    // Calcul: 3 diff -> 20% sur TOUT le lot BTTF (4 films).
    // (4 * 15€) * 0.8 = 48€
  },
  mixed: {
    label: "Catalogue Mixte",
    icon: Gift,
    color: "pink",
    content:
      "Back to the Future 1\nThe Matrix\nInception\nBack to the Future 2\nInterstellar\nThe Dark Knight",
    // Calcul: 2 diff -> 10% sur les 2 BTTF.
    // (2 * 15€ * 0.9) + (4 * 20€) = 107€
  },
};

const colorClasses = {
  blue: "text-blue-700 bg-blue-50 hover:bg-blue-100",
  green: "text-green-700 bg-green-50 hover:bg-green-100",
  purple: "text-purple-700 bg-purple-50 hover:bg-purple-100",
  gray: "text-gray-700 bg-gray-50 hover:bg-gray-100",
  yellow: "text-yellow-700 bg-yellow-50 hover:bg-yellow-100",
  pink: "text-pink-700 bg-pink-50 hover:bg-pink-100",
};

function CartInput({ onCalculate, isLoading }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onCalculate(text);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit();
    }
  };

  const loadPreset = (presetKey) => {
    setText(PRESETS[presetKey].content);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="text-blue-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-900">Your Cart</h2>
        </div>
      </div>

      {/* Preset Buttons - Grid Layout */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2 font-medium">
          Quick Examples:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(PRESETS).map(([key, preset]) => {
            const Icon = preset.icon;
            return (
              <button
                key={key}
                onClick={() => loadPreset(key)}
                disabled={isLoading}
                className={`flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium ${
                  colorClasses[preset.color]
                } disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors`}
              >
                <Icon size={14} />
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter DVDs (one per line)&#10;Example:&#10;Back to the Future 1&#10;Back to the Future 2&#10;The Matrix"
          className="flex-1 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm font-mono min-h-[200px]"
          disabled={isLoading}
        />

        <button
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Calculate Total
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default CartInput;
