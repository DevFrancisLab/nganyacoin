import React, { useState } from "react";
import ngcCoin from "../assets/ngc_coin.png";

export default function PayFarePage() {
  const [showPayModal, setShowPayModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [form, setForm] = useState({ plate: "", amount: "" });
  const [receiveForm, setReceiveForm] = useState({ address: "", amount: "" });
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpForm, setTopUpForm] = useState({ phone: "", amount: "" });
  const [topUpConfirming, setTopUpConfirming] = useState(false);
  const [topUpSuccess, setTopUpSuccess] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [success, setSuccess] = useState(false);
  const [receiveConfirming, setReceiveConfirming] = useState(false);
  const [receiveSuccess, setReceiveSuccess] = useState(false);
  // Wallet data and transactions (mock)
  const wallet = {
    balance: "12,450",
    fiat: "KES 37,350",
  };
  // Remove unused actions
  const transactions = [
    {
      type: "Ride Payment",
      amount: "-KES 80",
      time: "Just now",
    },
    {
      type: "Reward",
      amount: "+12 NGC",
      time: "Today",
    },
    {
      type: "Top Up",
      amount: "+KES 500",
      time: "Yesterday",
    },
  ];
  type Tx = { type: string; amount: string; time: string; id?: number };
  const [modalTx, setModalTx] = useState<Tx | null>(null);

  return (
    <>
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
                onClick={() => {
                  setShowPayModal(true);
                  setSuccess(false);
                  setForm({ plate: "", amount: "" });
                  setConfirming(false);
                }}
              >
                Pay Fare
              </button>
              <button
                className="flex-1 px-6 py-2.5 rounded-full bg-black/80 border border-yellow-400 text-yellow-300 font-bold text-lg transition-all duration-200 hover:bg-yellow-400/10 hover:text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
                style={{ minWidth: 100 }}
                onClick={() => {
                  setShowReceiveModal(true);
                  setReceiveSuccess(false);
                  setReceiveForm({ address: "", amount: "" });
                  setReceiveConfirming(false);
                }}
              >
                Receive
              </button>
              <button
                className="flex-1 px-6 py-2.5 rounded-full bg-black/80 border border-yellow-400 text-yellow-300 font-bold text-lg transition-all duration-200 hover:bg-yellow-400/10 hover:text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
                style={{ minWidth: 100 }}
                onClick={() => {
                  setShowTopUpModal(true);
                  setTopUpSuccess(false);
                  setTopUpForm({ phone: "", amount: "" });
                  setTopUpConfirming(false);
                }}
              >
                Top Up
              </button>
                  {/* Top Up Modal */}
                  {showTopUpModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur animate-fade-in">
                      <div className="glass rounded-3xl p-8 bg-black/90 border border-yellow-400/30 shadow-xl w-full max-w-md relative animate-float">
                        <button
                          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 text-2xl font-bold"
                          onClick={() => setShowTopUpModal(false)}
                          aria-label="Close"
                        >
                          ×
                        </button>
                        {!topUpSuccess ? (
                          <>
                            <div className="text-2xl font-bold text-yellow-300 mb-4">
                              Top Up Wallet (M-Pesa)
                            </div>
                            <form
                              className="flex flex-col gap-4"
                              onSubmit={(e) => {
                                e.preventDefault();
                                setTopUpConfirming(true);
                                setTimeout(() => {
                                  setTopUpConfirming(false);
                                  setTopUpSuccess(true);
                                }, 1200);
                              }}
                            >
                              <input
                                className="rounded-lg bg-black/40 border border-yellow-400/30 px-4 py-2 text-yellow-100 placeholder:text-yellow-100/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 transition shadow-glow"
                                placeholder="M-Pesa Phone Number"
                                value={topUpForm.phone}
                                required
                                pattern="^\d{10,13}$"
                                onChange={(e) =>
                                  setTopUpForm((f) => ({ ...f, phone: e.target.value }))
                                }
                              />
                              <input
                                className="rounded-lg bg-black/40 border border-yellow-400/30 px-4 py-2 text-yellow-100 placeholder:text-yellow-100/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 transition shadow-glow"
                                placeholder="Amount (KES)"
                                type="number"
                                min="1"
                                value={topUpForm.amount}
                                required
                                onChange={(e) =>
                                  setTopUpForm((f) => ({ ...f, amount: e.target.value }))
                                }
                              />
                              <button
                                type="submit"
                                className="rounded-full bg-yellow-400 text-black font-bold py-2.5 px-8 hover:bg-yellow-300 transition shadow-glow text-lg mt-2 disabled:opacity-60"
                                disabled={topUpConfirming}
                              >
                                {topUpConfirming ? "Processing..." : "Confirm Top Up"}
                              </button>
                            </form>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-4 py-8">
                            <span className="text-4xl">✅</span>
                            <div className="text-xl font-bold text-yellow-200 text-center">
                              Top Up Request Submitted!
                            </div>
                            <div className="text-yellow-100/70 text-center">
                              Request to top up <span className="font-semibold">KES {topUpForm.amount}</span> from <span className="font-semibold">{topUpForm.phone}</span> has been submitted.
                            </div>
                            <button
                              className="mt-4 rounded-full bg-yellow-400 text-black font-bold py-2.5 px-8 hover:bg-yellow-300 transition shadow-glow text-lg"
                              onClick={() => setShowTopUpModal(false)}
                            >
                              Close
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
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
              onClick={() => setModalTx({ ...t, id: i + 1 })}
            >
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-yellow-200 text-lg tracking-wide group-hover:text-yellow-300 transition">
                  {t.type}
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
      {/* Transaction Details Modal */}
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
              Transaction Details
            </div>
            <div className="flex flex-col gap-2 text-yellow-100/90">
              <div>
                <span className="font-bold text-yellow-300">Type:</span>{" "}
                {modalTx ? modalTx.type : ""}
              </div>
              <div>
                <span className="font-bold text-yellow-300">Amount:</span>{" "}
                {modalTx ? modalTx.amount : ""}
              </div>
              <div>
                <span className="font-bold text-yellow-300">Time:</span>{" "}
                {modalTx ? modalTx.time : ""}
              </div>
              <div>
                <span className="font-bold text-yellow-300">Transaction ID:</span>{" "}
                {modalTx ? `TXN-${modalTx.id?.toString().padStart(3, "0")}` : ""}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Receive Modal */}
      {showReceiveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur animate-fade-in">
          <div className="glass rounded-3xl p-8 bg-black/90 border border-yellow-400/30 shadow-xl w-full max-w-md relative animate-float">
            <button
              className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 text-2xl font-bold"
              onClick={() => setShowReceiveModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            {!receiveSuccess ? (
              <>
                <div className="text-2xl font-bold text-yellow-300 mb-4">
                  Receive NGC (Ethereum)
                </div>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setReceiveConfirming(true);
                    setTimeout(() => {
                      setReceiveConfirming(false);
                      setReceiveSuccess(true);
                    }, 1200);
                  }}
                >
                  <input
                    className="rounded-lg bg-black/40 border border-yellow-400/30 px-4 py-2 text-yellow-100 placeholder:text-yellow-100/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 transition shadow-glow"
                    placeholder="Ethereum Wallet Address"
                    value={receiveForm.address}
                    required
                    onChange={(e) =>
                      setReceiveForm((f) => ({ ...f, address: e.target.value }))
                    }
                  />
                  <input
                    className="rounded-lg bg-black/40 border border-yellow-400/30 px-4 py-2 text-yellow-100 placeholder:text-yellow-100/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 transition shadow-glow"
                    placeholder="Amount (NGC)"
                    type="number"
                    min="1"
                    value={receiveForm.amount}
                    required
                    onChange={(e) =>
                      setReceiveForm((f) => ({ ...f, amount: e.target.value }))
                    }
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-yellow-400 text-black font-bold py-2.5 px-8 hover:bg-yellow-300 transition shadow-glow text-lg mt-2 disabled:opacity-60"
                    disabled={receiveConfirming}
                  >
                    {receiveConfirming ? "Processing..." : "Confirm Receive"}
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <span className="text-4xl">✅</span>
                <div className="text-xl font-bold text-yellow-200 text-center">
                  Receive Request Submitted!
                </div>
                <div className="text-yellow-100/70 text-center">
                  Request to receive {" "}
                  <span className="font-semibold">
                    {receiveForm.amount} NGC
                  </span>{" "}to {" "}
                  <span className="font-semibold">{receiveForm.address}</span>{" "}
                  has been submitted.
                </div>
                <button
                  className="mt-4 rounded-full bg-yellow-400 text-black font-bold py-2.5 px-8 hover:bg-yellow-300 transition shadow-glow text-lg"
                  onClick={() => setShowReceiveModal(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
