import React from "react";

const rewards = {
  totalNGC: 320,
  cashback: 120,
  streak: 5,
  streakGoal: 7,
  freeRideProgress: 60, // percent
};

const achievements = [
  {
    label: "Daily Commuter",
    achieved: true,
    desc: "Ride every day for 3 days",
  },
  {
    label: "7-Day Streak",
    achieved: false,
    desc: "Ride 7 days in a row",
  },
  {
    label: "Loyal Rider",
    achieved: true,
    desc: "Complete 50 rides",
  },
];

export default function RewardsPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Rewards Hero Card */}
      <div className="glass bg-black/60 rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden hover:scale-[1.015] transition-transform duration-200 animate-fade-in">
        <div className="flex flex-col gap-2">
          <div className="text-lg text-yellow-200 font-semibold mb-1">Total Rewards</div>
          <div className="text-4xl font-extrabold text-yellow-300 tracking-tight mb-1 drop-shadow-glow">
            {rewards.totalNGC} <span className="text-2xl font-bold text-yellow-400">NGC</span>
          </div>
          <div className="text-md text-yellow-100/80 mb-2">Cashback: <span className="text-yellow-300 font-bold">KES {rewards.cashback}</span></div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-yellow-400/20 text-yellow-300 px-4 py-1 font-semibold text-sm shadow-glow animate-pulse">Ride Streak: {rewards.streak} days</span>
          </div>
        </div>
      </div>

      {/* Streak Tracker */}
      <div className="glass bg-black/50 rounded-2xl p-6 shadow-md flex flex-col gap-3 animate-fade-in">
        <div className="text-lg font-bold text-yellow-200 mb-2">Streak Tracker</div>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-4 bg-yellow-400/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 rounded-full transition-all duration-700 animate-pulse"
              style={{ width: `${(rewards.streak / rewards.streakGoal) * 100}%` }}
            />
          </div>
          <div className="text-yellow-300 font-bold">
            {rewards.streak}/{rewards.streakGoal} days
          </div>
        </div>
      </div>

      {/* Free Ride Progress */}
      <div className="glass bg-black/50 rounded-2xl p-6 shadow-md flex flex-col gap-3 animate-fade-in">
        <div className="text-lg font-bold text-yellow-200 mb-2">Free Ride Progress</div>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-4 bg-yellow-400/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 rounded-full transition-all duration-700 animate-glow"
              style={{ width: `${rewards.freeRideProgress}%` }}
            />
          </div>
          <div className="text-yellow-300 font-bold">
            {rewards.freeRideProgress}%
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="glass bg-black/50 rounded-2xl p-6 shadow-md flex flex-col gap-4 animate-fade-in">
        <div className="text-lg font-bold text-yellow-200 mb-2">Achievements</div>
        <div className="flex flex-wrap gap-6">
          {achievements.map((a) => (
            <div
              key={a.label}
              className={`flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer shadow-glow hover:scale-105 hover:shadow-yellow-400/40 ${
                a.achieved
                  ? "border-yellow-400 bg-yellow-400/10 animate-glow"
                  : "border-yellow-100/20 bg-black/30 opacity-60"
              }`}
            >
              <div className={`text-3xl font-extrabold ${a.achieved ? "text-yellow-300 animate-pulse" : "text-yellow-100/40"}`}>
                <span role="img" aria-label="badge">🏅</span>
              </div>
              <div className="text-yellow-200 font-bold text-lg">{a.label}</div>
              <div className="text-yellow-100/70 text-sm text-center">{a.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
