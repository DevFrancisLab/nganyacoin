import React, { useState, ReactNode } from "react";
import PayFarePage from "./PayFarePage";
import {
  Wallet,
  CreditCard,
  List,
  Gift,
  Home,
  Bell,
  User,
  TrendingUp,
} from "lucide-react";
import ngcCoin from "../assets/ngc_coin.png";

const navItems = [
  { label: "Wallet", icon: Wallet, key: "wallet" },
  { label: "Transactions", icon: List, key: "transactions" },
  { label: "Rewards", icon: Gift, key: "rewards" },
];
// ...existing code...
// WalletPage removed. Wallet now uses PayFarePage only.
function TransactionsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [modalTx, setModalTx] = useState<{
    id: string;
    vehicle: string;
    route: string;
    amount: number;
    kes: number;
    date: string;
    status: string;
    confirmation: string;
  } | null>(null);
  // Mock transactions
  const txs = [
    {
      id: "TXN-001",
      vehicle: "KDA 123A",
      route: "CBD → Rongai",
      amount: -120,
      kes: -240,
      date: "2026-05-27 09:12",
      status: "Paid",
      confirmation: "NGC-20260527-001",
    },
    {
      id: "TXN-002",
      vehicle: "KBC 456B",
      route: "CBD → Westlands",
      amount: -80,
      kes: -160,
      date: "2026-05-26 18:44",
      status: "Paid",
      confirmation: "NGC-20260526-002",
    },
    {
      id: "TXN-003",
      vehicle: "KDA 123A",
      route: "CBD → Rongai",
      amount: -120,
      kes: -240,
      date: "2026-05-26 08:10",
      status: "Pending",
      confirmation: "NGC-20260526-003",
    },
    {
      id: "TXN-004",
      vehicle: "KAA 789C",
      route: "CBD → Kahawa",
      amount: -60,
      kes: -120,
      date: "2026-05-25 15:22",
      status: "Paid",
      confirmation: "NGC-20260525-004",
    },
  ];

  const filtered = txs.filter(
    (t) =>
      (filter === "all" || t.status.toLowerCase() === filter) &&
      (t.vehicle.toLowerCase().includes(search.toLowerCase()) ||
        t.route.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-2xl font-bold text-yellow-300">
          Transaction History
        </div>
        <input
          className="rounded-lg bg-black/40 border border-yellow-400/30 px-4 py-2 text-yellow-100 placeholder:text-yellow-100/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 transition shadow-glow w-full md:w-72"
          placeholder="Search vehicle, route, or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-2">
        {[
          { key: "all", label: "All" },
          { key: "paid", label: "Paid" },
          { key: "pending", label: "Pending" },
        ].map((f) => (
          <button
            key={f.key}
            className={`rounded-full px-5 py-2 font-semibold border transition shadow-glow text-sm ${
              filter === f.key
                ? "bg-yellow-400/20 border-yellow-400 text-yellow-300"
                : "bg-black/40 border-yellow-400/20 text-yellow-100/70"
            }`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="glass rounded-2xl p-0 bg-black/70 border border-yellow-400/20 shadow-xl animate-float overflow-x-auto">
        <table className="min-w-full text-yellow-100">
          <thead>
            <tr className="border-b border-yellow-400/10">
              <th className="px-4 py-3 text-left font-semibold text-yellow-300">
                Vehicle
              </th>
              <th className="px-4 py-3 text-left font-semibold text-yellow-300">
                Route
              </th>
              <th className="px-4 py-3 text-left font-semibold text-yellow-300">
                Amount
              </th>
              <th className="px-4 py-3 text-left font-semibold text-yellow-300">
                Date/Time
              </th>
              <th className="px-4 py-3 text-left font-semibold text-yellow-300">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-yellow-100/50">
                  No transactions found.
                </td>
              </tr>
            )}
            {filtered.map((t) => (
              <tr
                key={t.id}
                className="hover:bg-yellow-400/5 cursor-pointer transition"
                onClick={() => setModalTx(t)}
              >
                <td className="px-4 py-3 font-semibold text-yellow-200">
                  {t.vehicle}
                </td>
                <td className="px-4 py-3">{t.route}</td>
                <td className="px-4 py-3 font-bold">
                  <span
                    className={
                      t.amount < 0 ? "text-yellow-300" : "text-green-400"
                    }
                  >
                    {t.amount} NGC
                  </span>
                  <span className="text-yellow-100/50 ml-2">({t.kes} KES)</span>
                </td>
                <td className="px-4 py-3 text-yellow-100/80">{t.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-bold border ${
                      t.status === "Paid"
                        ? "bg-yellow-400/20 text-yellow-300 border-yellow-400/40"
                        : "bg-blue-400/10 text-blue-300 border-blue-400/40"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for transaction details */}
      {modalTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur animate-fade-in">
          <div className="glass rounded-3xl p-8 bg-black/90 border border-yellow-400/30 shadow-xl w-full max-w-md relative animate-float">
            <button
              className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 text-2xl font-bold"
              onClick={() => setModalTx(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="text-2xl font-bold text-yellow-300 mb-4">
              Transaction Receipt
            </div>
            <div className="flex flex-col gap-2 text-yellow-100/90">
              <div>
                <span className="font-bold text-yellow-300">Vehicle:</span>{" "}
                {modalTx.vehicle}
              </div>
              <div>
                <span className="font-bold text-yellow-300">Route:</span>{" "}
                {modalTx.route}
              </div>
              <div>
                <span className="font-bold text-yellow-300">Amount:</span>{" "}
                {modalTx.amount} NGC{" "}
                <span className="text-yellow-400">/ {modalTx.kes} KES</span>
              </div>
              <div>
                <span className="font-bold text-yellow-300">Date/Time:</span>{" "}
                {modalTx.date}
              </div>
              <div>
                <span className="font-bold text-yellow-300">Status:</span>{" "}
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-bold border ${modalTx.status === "Paid" ? "bg-yellow-400/20 text-yellow-300 border-yellow-400/40" : "bg-blue-400/10 text-blue-300 border-blue-400/40"}`}
                >
                  {modalTx.status}
                </span>
              </div>
              <div>
                <span className="font-bold text-yellow-300">
                  Confirmation ID:
                </span>{" "}
                {modalTx.confirmation}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function RewardsPage() {
  // Placeholder skeleton for rewards page
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-[60vh]">
      <div className="glass rounded-2xl p-10 bg-black/70 border border-yellow-400/20 shadow-xl animate-float w-full max-w-xl flex flex-col items-center">
        <div className="animate-pulse w-24 h-24 rounded-full bg-yellow-400/10 mb-6" />
        <div className="h-8 w-2/3 bg-yellow-400/10 rounded mb-4 animate-pulse" />
        <div className="h-6 w-1/2 bg-yellow-400/10 rounded mb-2 animate-pulse" />
        <div className="h-6 w-1/3 bg-yellow-400/10 rounded mb-2 animate-pulse" />
        <div className="h-6 w-1/4 bg-yellow-400/10 rounded mb-2 animate-pulse" />
        <div className="text-yellow-100/40 mt-6">
          Rewards features coming soon...
        </div>
      </div>
    </div>
  );
}

function FallbackPage() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-[60vh]">
      <div className="glass rounded-2xl p-10 bg-black/70 border border-yellow-400/20 shadow-xl animate-float w-full max-w-xl flex flex-col items-center">
        <div className="animate-pulse w-24 h-24 rounded-full bg-yellow-400/10 mb-6" />
        <div className="h-8 w-2/3 bg-yellow-400/10 rounded mb-4 animate-pulse" />
        <div className="h-6 w-1/2 bg-yellow-400/10 rounded mb-2 animate-pulse" />
        <div className="h-6 w-1/3 bg-yellow-400/10 rounded mb-2 animate-pulse" />
        <div className="h-6 w-1/4 bg-yellow-400/10 rounded mb-2 animate-pulse" />
        <div className="text-yellow-100/40 mt-6">Page loading...</div>
      </div>
    </div>
  );
}

const pageComponents: Record<string, ReactNode> = {
  wallet: <PayFarePage />,
  transactions: <TransactionsPage />,
  rewards: <RewardsPage />,
};

export default function PassengerDashboardLayout() {
  // Listen for global event to open dashboard
  React.useEffect(() => {
    const handler = () => {
      setActivePage("wallet");
      setFade(false);
      setTimeout(() => setFade(true), 180);
    };
    window.addEventListener("nganya:open-dashboard", handler);
    return () => window.removeEventListener("nganya:open-dashboard", handler);
  }, []);
  const [activePage, setActivePage] = useState("wallet");
  const [fade, setFade] = useState(true);

  // Handle fade transition
  const handleNavClick = (key: string) => {
    if (key === activePage) return;
    setFade(false);
    setTimeout(() => {
      setActivePage(key);
      setFade(true);
    }, 180); // match transition duration
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-65 bg-black/60 border-r border-yellow-400/20 glass z-30 flex flex-col py-8 px-6 shadow-xl">
        <div className="flex items-center gap-3 mb-12">
          <span className="grid place-items-center size-10 rounded-lg bg-primary/15 border border-primary/30 text-primary glow-yellow overflow-hidden">
            <img
              src={ngcCoin}
              alt="NGC Coin Logo"
              className="w-8 h-8 object-contain"
            />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-yellow-300">
            NganyaCoin
          </span>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map(({ label, icon: Icon, key }) => (
            <button
              key={label}
              onClick={() => handleNavClick(key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-150
                ${activePage === key ? "bg-yellow-400/20 text-yellow-300 shadow-glow" : "text-yellow-100/80"}
                hover:bg-yellow-400/10 hover:text-yellow-300 hover:shadow-glow focus:outline-none`}
              style={{
                boxShadow:
                  activePage === key ? "0 0 8px 2px #ffe06655" : undefined,
              }}
            >
              <Icon className="size-5" />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto text-xs text-yellow-100/40 pt-8">
          © {new Date().getFullYear()} NganyaCoin
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 ml-65 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 bg-black/40 backdrop-blur border-b border-yellow-400/10 px-8 py-4 flex items-center gap-6 shadow-glow">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-xs rounded-lg bg-black/30 border border-yellow-400/20 px-4 py-2 text-yellow-100 placeholder:text-yellow-100/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 transition"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400/10 border border-yellow-400/40 px-4 py-1.5 font-semibold text-yellow-200 text-sm shadow-glow">
              <Wallet className="size-4 text-yellow-400" />
              12,450 NGC
            </span>
            <button className="relative p-2 rounded-full hover:bg-yellow-400/10 transition">
              <Bell className="size-5 text-yellow-200" />
              {/* Notification dot placeholder */}
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
            </button>
            <span className="inline-flex items-center justify-center size-9 rounded-full bg-yellow-400/20 border border-yellow-400/40 text-yellow-200 font-bold text-lg shadow-glow">
              <User className="size-5" />
            </span>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-10 bg-linear-to-br from-black/60 via-background/80 to-black/80">
          <div
            className={`glass rounded-3xl p-8 shadow-xl min-h-[60vh] transition-opacity duration-200 ${fade ? "opacity-100" : "opacity-0"}`}
            key={activePage}
          >
            {pageComponents[activePage] ?? <FallbackPage />}
          </div>
        </main>
      </div>
    </div>
  );
}
