import React, { useState } from "react";

export default function PayFarePage() {
  const [plate, setPlate] = useState("");
  const [fare, setFare] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timestamp, setTimestamp] = useState("");
  const [touched, setTouched] = useState({ plate: false, fare: false });

  // Mock wallet balance
  const walletNGC = 12450;
  const walletKES = 24800;

  const isPlateValid = plate.trim().length >= 6;
  const isFareValid = fare.trim() !== "" && !isNaN(Number(fare)) && Number(fare) > 0;
  const canSubmit = isPlateValid && isFareValid && !loading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimestamp(new Date().toLocaleString());
    }, 1600);
  };

  const reset = () => {
    setPlate("");
    setFare("");
    setSuccess(false);
    setTimestamp("");
    setTouched({ plate: false, fare: false });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="glass bg-black/60 rounded-3xl p-8 w-full max-w-md shadow-xl relative overflow-hidden animate-fade-up">
        {!success ? (
          <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
            <div className="text-2xl font-bold text-yellow-200 mb-2 text-center tracking-tight">
              Pay Fare
            </div>
            {/* Wallet Balance Card */}
            <div className="glass bg-black/70 rounded-2xl p-5 flex flex-col items-center mb-2 border border-yellow-400/20 shadow-glow">
              <div className="text-yellow-100/70 text-sm mb-1">
                Wallet Balance
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl md:text-4xl font-extrabold text-yellow-300 drop-shadow-glow animate-float">
                  {walletNGC.toLocaleString()} NGC
                </span>
                <span className="text-yellow-100/50 text-lg font-bold mb-1">
                  /
                </span>
                <span className="text-lg text-yellow-100/70 font-bold mb-1">
                  KES {walletKES.toLocaleString()}
                </span>
              </div>
            </div>
            {/* Vehicle Plate */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="plate"
                className="text-yellow-100/80 font-semibold"
              >
                Vehicle Number Plate
              </label>
              <input
                id="plate"
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                onBlur={() => setTouched((t) => ({ ...t, plate: true }))}
                className={`rounded-lg bg-black/40 border px-4 py-2 text-yellow-100 placeholder:text-yellow-100/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/80 transition font-mono tracking-widest uppercase ${touched.plate && !isPlateValid ? "border-red-400" : "border-yellow-400/20 focus:border-yellow-400"}`}
                placeholder="e.g. KDA 123A"
                maxLength={10}
                autoComplete="off"
                required
              />
              {touched.plate && !isPlateValid && (
                <span className="text-xs text-red-400 mt-1">
                  Enter a valid number plate (min 6 chars)
                </span>
              )}
            </div>
            {/* Fare Amount */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="fare"
                className="text-yellow-100/80 font-semibold"
              >
                Fare Amount (KES)
              </label>
              <input
                id="fare"
                type="number"
                min="1"
                value={fare}
                onChange={(e) => setFare(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, fare: true }))}
                className={`rounded-lg bg-black/40 border px-4 py-2 text-yellow-100 placeholder:text-yellow-100/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/80 transition font-mono ${touched.fare && !isFareValid ? "border-red-400" : "border-yellow-400/20 focus:border-yellow-400"}`}
                placeholder="e.g. 80"
                required
              />
              {touched.fare && !isFareValid && (
                <span className="text-xs text-red-400 mt-1">
                  Enter a valid fare amount
                </span>
              )}
            </div>
            {/* Confirm Button */}
            <button
              type="submit"
              className={`mt-2 rounded-full bg-yellow-400 text-black font-bold py-3 px-8 transition-all shadow-glow text-lg flex items-center justify-center gap-2 ${canSubmit ? "hover:bg-yellow-300" : "opacity-60 cursor-not-allowed"}`}
              disabled={!canSubmit}
            >
              {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-yellow-300 border-t-transparent rounded-full" />
              ) : (
                "Confirm Payment"
              )}
            </button>
            {/* Loading State Overlay */}
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur rounded-3xl z-10 animate-fade-in">
                <span className="animate-spin h-10 w-10 border-4 border-yellow-300 border-t-transparent rounded-full mb-6" />
                <div className="text-yellow-200 text-lg font-semibold mt-2 tracking-wide">
                  Processing NGC payment...
                </div>
              </div>
            )}
          </form>
        ) : (
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <div className="rounded-full bg-green-500/20 p-4 mb-2">
              <svg
                className="h-12 w-12 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="text-2xl font-bold text-green-300 mb-2">
              Payment Successful
            </div>
            {/* Receipt Card */}
            <div className="glass bg-black/80 rounded-2xl p-6 w-full max-w-xs border border-green-400/30 shadow-glow flex flex-col gap-3 text-yellow-100 animate-float">
              <div className="flex justify-between">
                <span className="font-semibold">Vehicle</span>
                <span className="font-mono">{plate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Amount</span>
                <span>{fare} KES</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Time</span>
                <span>{timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status</span>
                <span className="text-green-400 font-bold">PAID</span>
              </div>
            </div>
            <button
              onClick={reset}
              className="mt-2 rounded-full bg-yellow-400 text-black font-bold py-2 px-8 hover:bg-yellow-300 transition shadow-glow"
            >
              New Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
