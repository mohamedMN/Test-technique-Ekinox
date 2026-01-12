import React from "react";
import { Disc3, Sparkles, ArrowRight, Star, Zap, TrendingUp } from "lucide-react"; 

function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center gap-3 mb-16">
          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <Disc3 size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">DVD Store Manager</h1>
            <p className="text-blue-200 text-sm">Professional point of sale</p>
          </div>
        </header>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col justify-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 w-fit border border-white/20">
            <Star className="text-yellow-300" size={16} fill="currentColor" />
            <span className="text-sm font-medium">Smart discount calculator included</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Sell DVDs faster,<br />calculate smarter
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 max-w-2xl">
            Manage your DVD inventory with automatic discount calculation for Back to the Future collections. Simple, fast, and efficient.
          </p>

          <button
            onClick={onStart}
            className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center gap-2 w-fit shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Start a sale <ArrowRight size={20} />
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-blue-500/30 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-white" size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Instant calculation</h3>
            <p className="text-blue-100 text-sm">Get your total price in milliseconds with automatic discounts applied</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-blue-500/30 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="text-white" size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Smart discounts</h3>
            <p className="text-blue-100 text-sm">10-20% off on BTTF collections based on unique titles purchased</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-blue-500/30 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="text-white" size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Clean interface</h3>
            <p className="text-blue-100 text-sm">Simple and intuitive design for quick point-of-sale operations</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;