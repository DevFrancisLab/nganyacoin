import React, { useEffect, useRef, useState } from "react";

const mockBalance = 12450;
const mockFiat = 37350;
const mockTransactions = [
  { id: 1, type: "Payment", amount: -80, currency: "KES", status: "Paid", time: "Today 09:12" },
  { id: 2, type: "Top Up", amount: 500, currency: "KES", status: "Success", time: "Yesterday 18:40" },
  { id: 3, type: "Payment", amount: -60, currency: "KES", status: "Paid", time: "Yesterday 08:22" },
  { id: 4, type: "Payment", amount: -100, currency: "KES", status: "Paid", time: "2 days ago" },
  { id: 5, type: "Top Up", amount: 1000, currency: "KES", status: "Success", time: "2 days ago" },
];
const mockCredit = 300;
const mockMpesa = "+254 712 345678";

function useAnimatedCounter(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<number>(0);
  useEffect(() => {
    let start = 0;
    const step = (timestamp: number) => {
      if (!ref.current) ref.current = timestamp;
      const progress = Math.min((timestamp - ref.current) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };
    setValue(0);
    ref.current = 0;
    requestAnimationFrame(step);
    // eslint-disable-next-line
  }, [target]);
  return value;
}

export default function WalletPage() {
  const animatedNGC = useAnimatedCounter(mockBalance);
  return (
    <div className="flex flex-col gap-8">
      {/* Wallet Balance Card */}
      <div className="glass bg-black/60 rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden hover:scale-[1.015] transition-transform duration-200">
        <div>
          <div className="text-lg text-yellow-200 font-semibold mb-2">Wallet Balance</div>
          <div className="text-5xl font-extrabold text-yellow-300 tracking-tight mb-2 drop-shadow-glow font-mono">
            {animatedNGC.toLocaleString()} <span className="text-2xl font-bold text-yellow-400">NGC</span>
          </div>
          <div className="text-md text-yellow-100/80 mb-6">KES {mockFiat.toLocaleString()}</div>
          <div className="flex gap-4">
            <button className="rounded-full bg-yellow-400 text-black font-bold py-2.5 px-8 hover:bg-yellow-300 transition shadow-glow">Top Up</button>
            <button className="rounded-full bg-black/60 border border-yellow-400 text-yellow-300 font-semibold py-2.5 px-8 hover:bg-yellow-400 hover:text-black transition">Withdraw</button>
          </div>
        </div>
        <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none select-none">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="55" stroke="#ffe066" strokeWidth="10" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Transaction History List */}
      <div className="glass bg-black/50 rounded-2xl p-6 shadow-md hover:-translate-y-1 hover:shadow-glow transition-all duration-200">
        <div className="text-lg font-bold text-yellow-200 mb-4">Transaction History</div>
        <div className="divide-y divide-yellow-400/10">
          {mockTransactions.map((tx) => (
            <div key={tx.id} className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-2">
              <div className="flex items-center gap-4 min-w-0">
                <span className="text-yellow-300 font-semibold w-24 truncate">{tx.type}</span>
                <span className={`font-bold ${tx.amount < 0 ? 'text-red-400' : 'text-green-400'}`}>{tx.amount > 0 ? '+' : ''}{tx.amount} {tx.currency}</span>
                <span className="text-yellow-100/80 truncate">{tx.time}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tx.status === 'Paid' || tx.status === 'Success' ? 'bg-green-400/20 text-green-300' : 'bg-yellow-400/20 text-yellow-300'}`}>{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fare Credit Section */}
      <div className="glass bg-black/50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md hover:-translate-y-1 hover:shadow-glow transition-all duration-200">
        <div>
          <div className="text-lg font-bold text-yellow-200 mb-2">Fare Credit</div>
          <div className="text-3xl font-extrabold text-yellow-300 mb-1">KES {mockCredit.toLocaleString()}</div>
        </div>
        <button className="rounded-full bg-yellow-400 text-black font-bold py-2.5 px-8 hover:bg-yellow-300 transition shadow-glow">Borrow</button>
      </div>

      {/* Linked Payment Methods */}
      <div className="glass bg-black/50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md hover:-translate-y-1 hover:shadow-glow transition-all duration-200">
        <div>
          <div className="text-lg font-bold text-yellow-200 mb-2">Linked Payment Methods</div>
          <div className="text-md text-yellow-100/80 mb-2">M-Pesa: <span className="font-mono text-yellow-300">{mockMpesa}</span></div>
        </div>
        <div className="flex gap-3">
          <button className="rounded-full bg-yellow-400 text-black font-bold py-2.5 px-6 hover:bg-yellow-300 transition shadow-glow">Add</button>
          <button className="rounded-full bg-black/60 border border-yellow-400 text-yellow-300 font-semibold py-2.5 px-6 hover:bg-yellow-400 hover:text-black transition">Remove</button>
        </div>
      </div>

      {/* Spending Chart Placeholder */}
      <div className="glass bg-black/50 rounded-2xl p-6 shadow-md hover:-translate-y-1 hover:shadow-glow transition-all duration-200 flex flex-col items-center justify-center min-h-[180px]">
        <div className="text-lg font-bold text-yellow-200 mb-2">Spending Chart</div>
        <div className="w-full h-24 bg-yellow-400/10 rounded-xl flex items-center justify-center text-yellow-100/40 font-mono">[Chart Placeholder]</div>
      </div>
    </div>
  );
}
