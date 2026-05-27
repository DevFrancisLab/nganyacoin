import React from "react";

const mockBalance = "12,450 NGC";
const mockFiat = "KES 37,350";
const quickStats = [
  { label: "Total Trips", value: 128 },
  { label: "Total Spent", value: "KES 4,200" },
  { label: "Rewards Earned", value: "320 NGC" },
  { label: "Wallet Growth", value: "+18%" },
];
const activeTrip = {
  plate: "KDA 123A",
  route: "CBD → Rongai",
  fare: "KES 80",
  status: "Paid",
};
const transactions = [
  {
    plate: "KDA 123A",
    route: "CBD → Rongai",
    amount: "-KES 80",
    time: "Just now",
  },
  {
    plate: "KBC 456B",
    route: "Kahawa → Town",
    amount: "-KES 60",
    time: "Today",
  },
  {
    plate: "KCE 789C",
    route: "Ruiru → CBD",
    amount: "-KES 100",
    time: "Yesterday",
  },
  {
    plate: "KDA 123A",
    route: "CBD → Rongai",
    amount: "-KES 80",
    time: "2 days ago",
  },
  {
    plate: "KBC 456B",
    route: "Kahawa → Town",
    amount: "-KES 60",
    time: "2 days ago",
  },
];
const rewards = {
  streak: 5,
  cashback: 60, // percent
};

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Hero Wallet Card */}
      <div className="glass bg-black/60 rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden hover:scale-[1.015] transition-transform duration-200">
        <div>
          <div className="text-lg text-yellow-200 font-semibold mb-2">
            Wallet Balance
          </div>
          <div className="text-5xl font-extrabold text-yellow-300 tracking-tight mb-2 drop-shadow-glow">
            {mockBalance}
          </div>
          <div className="text-md text-yellow-100/80 mb-6">{mockFiat}</div>
          <div className="flex gap-4">
            <button className="rounded-full bg-yellow-400 text-black font-bold py-2.5 px-8 hover:bg-yellow-300 transition shadow-glow">
              Pay Fare
            </button>
            <button className="rounded-full bg-black/60 border border-yellow-400 text-yellow-300 font-semibold py-2.5 px-8 hover:bg-yellow-400 hover:text-black transition">
              Top Up Wallet
            </button>
          </div>
        </div>
        <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none select-none">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle
              cx="60"
              cy="60"
              r="55"
              stroke="#ffe066"
              strokeWidth="10"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className="glass bg-black/50 rounded-2xl p-6 flex flex-col items-center shadow-md hover:-translate-y-1 hover:shadow-glow transition-all duration-200"
          >
            <div className="text-2xl font-bold text-yellow-200 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-yellow-100/70">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Active Trip Card */}
      <div className="glass bg-black/50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md hover:-translate-y-1 hover:shadow-glow transition-all duration-200">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="text-lg font-bold text-yellow-300">
            {activeTrip.plate}
          </div>
          <div className="text-md text-yellow-100/80">{activeTrip.route}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-md text-yellow-200 font-semibold">
            {activeTrip.fare}
          </div>
          <span className="inline-block rounded-full bg-yellow-400/20 text-yellow-300 px-4 py-1 font-semibold text-sm shadow-glow">
            {activeTrip.status}
          </span>
        </div>
      </div>

      {/* Recent Transactions Feed */}
      <div className="glass bg-black/50 rounded-2xl p-6 shadow-md hover:-translate-y-1 hover:shadow-glow transition-all duration-200">
        <div className="text-lg font-bold text-yellow-200 mb-4">
          Recent Transactions
        </div>
        <div className="divide-y divide-yellow-400/10">
          {transactions.map((t, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-2"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="text-yellow-300 font-semibold w-24 truncate">
                  {t.plate}
                </span>
                <span className="text-yellow-100/80 truncate">{t.route}</span>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`font-bold ${t.amount.startsWith("-") ? "text-red-400" : "text-green-400"}`}
                >
                  {t.amount}
                </span>
                <span className="text-yellow-100/60 text-xs w-20 text-right">
                  {t.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Preview Card */}
      <div className="glass bg-black/50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md hover:-translate-y-1 hover:shadow-glow transition-all duration-200">
        <div>
          <div className="text-lg font-bold text-yellow-200 mb-2">
            Ride Streak
          </div>
          <div className="text-3xl font-extrabold text-yellow-300 mb-1">
            {rewards.streak} days
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-sm text-yellow-100/70">Cashback Progress</div>
          <div className="w-full h-3 bg-yellow-400/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 rounded-full transition-all duration-500"
              style={{ width: `${rewards.cashback}%` }}
            />
          </div>
          <div className="text-xs text-yellow-200 mt-1">
            {rewards.cashback}% to next reward
          </div>
        </div>
      </div>
    </div>
  );
}
