import React from "react";
import ngcCoin from "../assets/ngc_coin.png";

export default function PayFarePage() {
  // Wallet data and transactions (mock)
  const wallet = {
    balance: "12,450",
    fiat: "KES 37,350",
  };
  const actions = [
    { label: "Pay Fare", onClick: () => {}, icon: "💸" },
    { label: "Receive", onClick: () => {}, icon: "⬇️" },
    { label: "Top Up", onClick: () => {}, icon: "➕" },
  ];
  const transactions = [
    {
      type: "Ride Payment",
      desc: "CBD → Rongai",
      amount: "-KES 80",
      time: "Just now",
    },
    {
      type: "Reward",
      desc: "Earned NGC",
      amount: "+12 NGC",
      time: "Today",
    },
    {
      type: "Top Up",
      desc: "M-Pesa Deposit",
      amount: "+KES 500",
      time: "Yesterday",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full bg-linear-to-br from-black via-zinc-900 to-black/90 py-10">
      {/* Wallet Hero Card */}
      <div className="relative w-full max-w-2xl mb-12">
        <div
          className="glass bg-black/90 rounded-2xl p-5 md:p-7 flex flex-row items-center justify-between shadow-lg border border-yellow-400/20 backdrop-blur-xl"
          style={{ boxShadow: "0 0 24px 4px #ffe06622, 0 2px 16px 0 #000a" }}
        >
          {/* Left: Wallet Info */}
          <div className="flex-1 flex flex-col gap-2 items-start min-w-0">
            <span className="text-yellow-300/90 text-sm font-bold uppercase tracking-widest mb-1">
              NGC Wallet
            </span>
            <div className="flex flex-col gap-0.5">
              <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-yellow-300 leading-tight">
                {wallet.balance}{" "}
                <span className="text-xl text-yellow-100/80 font-bold align-super">
                  NGC
                </span>
              </div>
              <div className="text-base text-yellow-100/80 font-semibold mt-0.5">
                {wallet.fiat}
              </div>
            </div>
            {/* Pill-style Action Buttons */}
            <div className="flex flex-row gap-2 mt-3 w-full">
              <button
                className="px-5 py-1.5 rounded-full bg-yellow-400 text-black font-bold text-sm shadow-glow transition-all duration-200 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                style={{ minWidth: 90 }}
              >
                Pay Fare
              </button>
              <button
                className="px-5 py-1.5 rounded-full bg-black/80 border border-yellow-400 text-yellow-300 font-semibold text-sm transition-all duration-200 hover:bg-yellow-400/10 hover:text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
                style={{ minWidth: 90 }}
              >
                Receive
              </button>
              <button
                className="px-5 py-1.5 rounded-full bg-black/80 border border-yellow-400 text-yellow-300 font-semibold text-sm transition-all duration-200 hover:bg-yellow-400/10 hover:text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
                style={{ minWidth: 90 }}
              >
                Top Up
              </button>
            </div>
          </div>
          {/* Right: NGC Coin Image, smaller, less glow, decorative */}
          <div className="flex items-center justify-center ml-4 md:ml-8">
            <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20">
              <div className="absolute inset-0 rounded-full bg-yellow-300/10 blur-md z-0" />
              <img
                src={ngcCoin}
                alt="NGC Coin"
                className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 object-contain animate-float-slow drop-shadow-glow relative z-10"
                style={{ filter: "drop-shadow(0 0 8px #ffe06644)" }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Recent Transactions Section */}
      <div className="w-full max-w-2xl">
        <div className="text-xl md:text-2xl font-bold mb-5 text-yellow-100 tracking-tight flex items-center gap-2">
          Recent
          <span className="text-yellow-300 animate-neon-pulse">
            Transactions
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {transactions.map((t, i) => (
            <div
              key={i}
              className="glass bg-black/85 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between border border-yellow-400/10 shadow hover:shadow-glow transition-all duration-150 cursor-pointer group hover:bg-yellow-400/5 hover:border-yellow-400/20"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-yellow-200 text-base tracking-wide group-hover:text-yellow-300 transition">
                  {t.type}
                </span>
                <span className="text-yellow-100/80 text-sm group-hover:text-yellow-200 transition">
                  {t.desc}
                </span>
              </div>
              <div className="flex flex-col md:items-end gap-0.5 mt-2 md:mt-0">
                <span
                  className={`font-bold text-lg ${t.amount.startsWith("+") ? "text-green-400" : "text-red-400"} tracking-wide group-hover:scale-105 transition-transform`}
                >
                  {t.amount}
                </span>
                <span className="text-yellow-100/60 text-xs tracking-widest group-hover:text-yellow-200 transition">
                  {t.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
