import React, { useState } from "react";

const mockTransactions = [
  {
    id: 1,
    plate: "KDA 123A",
    route: "CBD → Rongai",
    amount: -80,
    currency: "KES",
    status: "Paid",
    time: "2026-05-27 09:12",
  },
  {
    id: 2,
    plate: "KBC 456B",
    route: "Kahawa → Town",
    amount: -60,
    currency: "KES",
    status: "Paid",
    time: "2026-05-26 08:22",
  },
  {
    id: 3,
    plate: "KCE 789C",
    route: "Ruiru → CBD",
    amount: -100,
    currency: "KES",
    status: "Pending",
    time: "2026-05-25 18:40",
  },
  {
    id: 4,
    plate: "KDA 123A",
    route: "CBD → Rongai",
    amount: -80,
    currency: "KES",
    status: "Paid",
    time: "2026-05-24 10:10",
  },
  {
    id: 5,
    plate: "KBC 456B",
    route: "Kahawa → Town",
    amount: -60,
    currency: "KES",
    status: "Paid",
    time: "2026-05-23 07:55",
  },
];

const statusColors = {
  Paid: "bg-green-400/20 text-green-300",
  Pending: "bg-yellow-400/20 text-yellow-300",
};

export default function TransactionsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [modalTx, setModalTx] = useState(null);

  const filtered = mockTransactions.filter((tx) => {
    if (filter !== "All" && tx.status !== filter) return false;
    if (
      search &&
      !(
        tx.plate.toLowerCase().includes(search.toLowerCase()) ||
        tx.route.toLowerCase().includes(search.toLowerCase())
      )
    )
      return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <input
          type="text"
          placeholder="Search by vehicle or route..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg bg-black/40 border border-yellow-400/20 px-4 py-2 text-yellow-100 placeholder:text-yellow-100/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 transition w-full md:w-72"
        />
        <div className="flex gap-2 mt-2 md:mt-0">
          {["All", "Paid", "Pending"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 font-semibold border transition focus:outline-none focus:ring-2 focus:ring-yellow-400/60 ${
                filter === f
                  ? "bg-yellow-400 text-black border-yellow-400 shadow-glow"
                  : "bg-black/40 text-yellow-100 border-yellow-400/20 hover:bg-yellow-400/10 hover:text-yellow-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table/Card */}
      <div className="glass bg-black/50 rounded-2xl p-0 shadow-md overflow-hidden">
        <div className="hidden md:grid grid-cols-6 gap-4 px-8 py-4 text-yellow-100/60 text-sm font-semibold border-b border-yellow-400/10">
          <div>Vehicle</div>
          <div>Route</div>
          <div className="text-right">Amount</div>
          <div>Date/Time</div>
          <div>Status</div>
          <div></div>
        </div>
        <div>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-yellow-100/40">No transactions found.</div>
          )}
          {filtered.map((tx) => (
            <button
              key={tx.id}
              onClick={() => setModalTx(tx)}
              className="w-full flex flex-col md:grid md:grid-cols-6 gap-4 items-center px-4 md:px-8 py-4 border-b border-yellow-400/10 bg-black/0 hover:bg-yellow-400/5 transition group text-left focus:outline-none"
            >
              <div className="font-mono text-yellow-300 text-base md:text-sm w-full md:w-auto">{tx.plate}</div>
              <div className="truncate w-full md:w-auto">{tx.route}</div>
              <div className={`font-bold text-right w-full md:w-auto ${tx.amount < 0 ? "text-red-400" : "text-green-400"}`}>
                {tx.amount > 0 ? "+" : ""}
                {tx.amount} {tx.currency}
              </div>
              <div className="text-yellow-100/70 w-full md:w-auto">{tx.time}</div>
              <div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[tx.status]}`}>{tx.status}</span>
              </div>
              <div className="hidden md:block group-hover:translate-x-1 transition-transform text-yellow-400">&rarr;</div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal for receipt */}
      {modalTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fade-in">
          <div className="glass bg-black/80 rounded-2xl p-8 w-full max-w-sm shadow-xl relative flex flex-col gap-4">
            <button
              className="absolute top-3 right-3 text-yellow-200 hover:text-yellow-400 text-xl"
              onClick={() => setModalTx(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="text-2xl font-bold text-yellow-200 mb-2">Transaction Receipt</div>
            <div className="flex flex-col gap-2 text-yellow-100">
              <div className="flex justify-between"><span className="font-semibold">Vehicle</span><span className="font-mono">{modalTx.plate}</span></div>
              <div className="flex justify-between"><span className="font-semibold">Route</span><span>{modalTx.route}</span></div>
              <div className="flex justify-between"><span className="font-semibold">Amount</span><span className={modalTx.amount < 0 ? "text-red-400" : "text-green-400"}>{modalTx.amount} {modalTx.currency}</span></div>
              <div className="flex justify-between"><span className="font-semibold">Date/Time</span><span>{modalTx.time}</span></div>
              <div className="flex justify-between"><span className="font-semibold">Status</span><span className={statusColors[modalTx.status]}>{modalTx.status}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
