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
    <div className="flex flex-col items-center justify-center min-h-[75vh] w-full bg-linear-to-br from-black via-zinc-900 to-black/90 py-10">
      {/* Wallet Hero Card */}
      <div className="relative w-full max-w-3xl mb-12">
        <div
          className="glass bg-black/90 rounded-2xl p-7 md:p-10 flex flex-row items-center justify-between shadow-xl border border-yellow-400/20 backdrop-blur-xl min-h-75"
          style={{ boxShadow: "0 0 32px 8px #ffe06633, 0 2px 16px 0 #000a" }}
        >
          {/* Left: Wallet Info */}
          <div className="flex-1 flex flex-col gap-2 items-start min-w-0">
            <span className="text-yellow-300/90 text-lg font-extrabold uppercase tracking-widest mb-1 drop-shadow-glow">
              NGC Wallet
            </span>
            <div className="flex flex-col gap-0.5">
              <div className="text-5xl md:text-6xl font-extrabold tracking-tight text-yellow-300 leading-tight drop-shadow-glow">
                {wallet.balance}{" "}
                <span className="text-2xl md:text-3xl text-yellow-100/80 font-bold align-super">
                  NGC
                </span>
              </div>
              <div className="text-xl md:text-2xl text-yellow-100/80 font-semibold mt-1 drop-shadow-glow">
                {wallet.fiat}
              </div>
            </div>
            {/* Pill-style Action Buttons */}
            <div className="flex flex-row gap-3 mt-4 w-full">
              <button
                className="flex-1 px-6 py-2.5 rounded-full bg-yellow-400 text-black font-extrabold text-lg shadow-glow transition-all duration-200 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                style={{ minWidth: 100 }}
              >
                Pay Fare
              </button>
              <button
                className="flex-1 px-6 py-2.5 rounded-full bg-black/80 border border-yellow-400 text-yellow-300 font-bold text-lg transition-all duration-200 hover:bg-yellow-400/10 hover:text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
                style={{ minWidth: 100 }}
              >
                Receive
              </button>
              <button
                className="flex-1 px-6 py-2.5 rounded-full bg-black/80 border border-yellow-400 text-yellow-300 font-bold text-lg transition-all duration-200 hover:bg-yellow-400/10 hover:text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
                style={{ minWidth: 100 }}
              >
                Top Up
              </button>
            </div>
          </div>
          {/* Right: NGC Coin Image, balanced, premium */}
          <div className="flex items-center justify-center ml-6 md:ml-10">
            <div className="relative flex items-center justify-center w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44">
              {/* Premium radial glow and blur lighting */}
              <div className="absolute inset-0 rounded-full bg-yellow-200/25 blur-2xl z-0" />
              <div className="absolute inset-2 rounded-full bg-yellow-400/15 blur-lg z-0" />
              <img
                src={ngcCoin}
                alt="NGC Coin"
                className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 object-contain animate-float-slow shadow-xl relative z-10"
                style={{ filter: "drop-shadow(0 2px 16px #ffe06699)" }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Recent Transactions Section */}
      <div className="w-full max-w-3xl">
        <div className="text-2xl md:text-3xl font-extrabold mb-7 text-yellow-100 tracking-tight flex items-center gap-3">
          Recent
          <span className="text-yellow-300 animate-neon-pulse">
            Transactions
          </span>
        </div>
        <div className="flex flex-col gap-4">
          {transactions.map((t, i) => (
            <div
              key={i}
              className="glass bg-black/85 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between border border-yellow-400/10 shadow-lg hover:shadow-glow transition-all duration-150 cursor-pointer group hover:bg-yellow-400/5 hover:border-yellow-400/20"
            >
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-yellow-200 text-lg tracking-wide group-hover:text-yellow-300 transition">
                  {t.type}
                </span>
                <span className="text-yellow-100/80 text-base group-hover:text-yellow-200 transition">
                  {t.desc}
                </span>
              </div>
              <div className="flex flex-col md:items-end gap-1 mt-2 md:mt-0">
                <span
                  className={`font-bold text-2xl ${t.amount.startsWith("+") ? "text-green-400" : "text-red-400"} tracking-wide group-hover:scale-105 transition-transform`}
                >
                  {t.amount}
                </span>
                <span className="text-yellow-100/60 text-sm tracking-widest group-hover:text-yellow-200 transition">
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
