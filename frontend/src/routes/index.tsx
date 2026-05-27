import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/matatu-hero.png";
import {
  Wallet, LineChart, Smartphone, BarChart3, ShieldCheck, ArrowRight,
  Play, Bus, CreditCard, Activity, TrendingUp, Clock, Eye, FileBarChart,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NganyaCoin (NGC) — Pay. Ride. Earn. Own Mobility Value." },
      { name: "description", content: "Mobility Wallet & Transport Currency for Africa. NganyaCoin is a mobility wallet and transport currency powering digital fare payments, commuter rewards, and transport finance in Kenya." },
    ],
  }),
});

import React, { useEffect, useState } from "react";
import PassengerDashboardLayout from "../components/PassengerDashboardLayout";

function Navbar() {
  const links = ["Home", "Features", "How It Works", "Benefits", "Contact"];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors ${scrolled ? "bg-background/90 backdrop-blur border-b border-border shadow-sm" : "bg-transparent"}`}>
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <span className="grid place-items-center size-9 rounded-lg bg-primary/15 border border-primary/30 text-primary glow-yellow">
            <Bus className="size-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Nganya<span className="text-primary">Coin</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <a href="#cta" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:brightness-110 transition glow-yellow">
          Get Started <ArrowRight className="size-4" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex items-center">
      <img src={heroImg} alt="Modern Nairobi matatu at night" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.1_0.015_250/0.6)_70%)]" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-24 flex flex-col items-center justify-center animate-fade-up">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-center">
          Pay. Ride. Earn.<br />Own <span className="text-primary text-glow">Mobility Value.</span>
        </h1>
        <div className="mt-8 w-full flex flex-col items-center">
          <p className="text-lg md:text-xl text-yellow-100/90 max-w-xl font-medium text-center">
            Your transport wallet for every ride.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <button
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold hover:brightness-110 transition glow-yellow"
            onClick={() => {
              // Custom event to trigger dashboard navigation in SPA layout
              window.dispatchEvent(new CustomEvent("nganya:open-dashboard"));
            }}
          >
            Open Wallet <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}


function Features() {
  const items = [
    { icon: Wallet, title: "Wallet Payments", desc: "Pay fares instantly using NGC wallet or M-Pesa." },
    { icon: LineChart, title: "NGC Rewards System", desc: "Earn NGC tokens every ride you take." },
    { icon: Clock, title: "Mobility Credit Access", desc: "Get fare loans and transport micro-financing." },
    { icon: Activity, title: "Real-Time Transport Ledger", desc: "Every trip recorded transparently in real time." },
    { icon: BarChart3, title: "SACCO Revenue Intelligence", desc: "Fleet analytics and revenue tracking for operators." },
    { icon: FileBarChart, title: "Transport Finance Layer", desc: "Enable maintenance and vehicle expansion financing." },
  ];
  return (
    <section id="features" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">NganyaCoin Ecosystem</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">A transport wallet powering payments, rewards, and mobility finance.</h2>
        </div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((f) => (
            <div key={f.title} className="group glass rounded-2xl p-7 hover:border-primary/40 transition-all hover:-translate-y-1">
              <div className="grid place-items-center size-12 rounded-xl bg-primary/10 border border-primary/30 text-primary group-hover:glow-yellow transition">
                <f.icon className="size-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function HowItWorks() {
  const steps = [
    { n: "01", title: "Load Your Wallet", desc: "Add funds using M-Pesa into your NganyaCoin wallet." },
    { n: "02", title: "Board Any Matatu", desc: "No friction — just enter the vehicle as usual." },
    { n: "03", title: "Pay With NGC", desc: "Instant fare payment from your wallet or mobile money." },
    { n: "04", title: "Earn & Track Value", desc: "Get rewards and track all trips in your wallet." },
  ];
  return (
    <section id="how-it-works" className="relative py-32 bg-card/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">How NganyaCoin Works</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">From wallet to ride in seconds.</h2>
        </div>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.n} className="relative glass rounded-2xl p-7 hover:border-primary/40 transition">
              <div className="text-5xl font-black text-primary/30">{s.n}</div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 size-5 text-primary/40" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function Dashboard() {
  // Mock data for wallet and activity
  const wallet = {
    balance: '12,450 NGC',
    fiat: 'KES 37,350',
    monthlySpend: 'KES 4,200',
  };
  const activity = [
    { type: 'Ride', desc: 'CBD → Rongai', amount: '-KES 80', time: 'Just now' },
    { type: 'Reward', desc: 'Earned NGC', amount: '+12 NGC', time: 'Today' },
    { type: 'Top Up', desc: 'M-Pesa Deposit', amount: '+KES 500', time: 'Yesterday' },
    { type: 'Ride', desc: 'Kahawa → Town', amount: '-KES 60', time: 'Yesterday' },
    { type: 'Ride', desc: 'Ruiru → CBD', amount: '-KES 100', time: '2 days ago' },
  ];
  const stats = [
    { label: 'Total Rides', value: '128' },
    { label: 'Active Routes', value: '7' },
    { label: 'Monthly Spend', value: 'KES 4,200' },
  ];
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Your Mobility Wallet Dashboard</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Track your rides, balance, rewards, and transport spending in real time.</h2>
            <p className="mt-5 text-muted-foreground text-lg">
              Your commuter wallet experience and personal transport finance dashboard.
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-background/60 border border-border p-6 text-center">
                  <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
                  <div className="text-2xl font-bold text-primary">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            {/* Wallet Overview Card */}
            <div className="glass rounded-3xl p-8 mb-8 shadow-xl" style={{boxShadow: '0 0 32px 8px #ffe06655'}}>
              <div className="flex items-center gap-3 mb-2">
                <Wallet className="size-7 text-yellow-400 drop-shadow-glow" />
                <span className="text-lg font-semibold text-yellow-300 tracking-wide">NGC Wallet</span>
              </div>
              <div className="text-4xl font-extrabold text-white tracking-tight mb-2">
                {wallet.balance} <span className="text-yellow-400">NGC</span>
              </div>
              <div className="text-md text-yellow-100/80 mb-1">{wallet.fiat}</div>
              <div className="text-sm text-yellow-100/60 mb-4">Monthly Spend: <span className="font-semibold text-yellow-200">{wallet.monthlySpend}</span></div>
            </div>
            {/* Live Activity Feed */}
            <div className="rounded-3xl bg-background/60 border border-border p-6">
              <div className="text-md font-semibold mb-4 text-primary">Live Activity Feed</div>
              <div className="space-y-3">
                {activity.map((a, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-background/80 border border-border px-4 py-3 text-sm">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">{a.type}</span>
                      <span className="text-muted-foreground text-xs">{a.desc}</span>
                    </div>
                    <div className={`font-bold ${a.amount.startsWith('+') ? 'text-green-500' : 'text-red-400'}`}>{a.amount}</div>
                    <span className="text-muted-foreground text-xs w-20 text-right">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function Benefits() {
  const items = [
    { icon: Wallet, title: "Smarter Mobility Payments", desc: "No cash, no stress — instant digital fare payments." },
    { icon: LineChart, title: "Earn While You Ride", desc: "Every trip earns you NGC rewards." },
    { icon: ShieldCheck, title: "Safer Transport Economy", desc: "Transparent payments reduce cash handling risks." },
    { icon: FileBarChart, title: "Financial Access for Operators", desc: "Enable transport credit and fleet financing." },
  ];
  return (
    <section id="benefits" className="relative py-32 bg-card/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Why NganyaCoin</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Built for commuters, operators, and Africa’s transport economy.</h2>
        </div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((b) => (
            <div key={b.title} className="glass rounded-2xl p-7 hover:border-primary/40 hover:-translate-y-1 transition">
              <b.icon className="size-7 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl glass p-12 md:p-20 text-center">
          <div className="absolute -inset-px rounded-3xl bg-linear-to-br from-primary/20 via-transparent to-primary/10 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 size-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Start Riding the Future<br />of Mobility Money
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
              Pay fares, earn rewards, and access transport finance in one wallet.
            </p>
            <a href="#contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 font-semibold hover:brightness-110 transition glow-yellow">
              Open NganyaCoin Wallet <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="grid place-items-center size-7 rounded-md bg-primary/15 border border-primary/30 text-primary">
            <Bus className="size-4" />
          </span>
          <span className="font-semibold text-foreground">NganyaCoin <span className="text-primary">(NGC Wallet)</span></span>
        </div>
        <div>© {new Date().getFullYear()} NganyaCoin. Built in Nairobi.</div>
        <a href="mailto:hello@nganyacoin.africa" className="hover:text-primary transition">hello@nganyacoin.africa</a>
      </div>
    </footer>
  );
}


function WalletPreview() {
  const balance = '12,450 NGC';
  const fiat = 'KES 37,350';
  const transactions = [
    { type: 'Ride Payment', desc: 'CBD → Rongai', amount: '-KES 80', time: 'Just now' },
    { type: 'Reward', desc: 'Earned NGC', amount: '+12 NGC', time: 'Today' },
    { type: 'Top Up', desc: 'M-Pesa Deposit', amount: '+KES 500', time: 'Yesterday' },
  ];
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Your NganyaCoin Wallet</span>
        </div>
        <div className="glass rounded-3xl p-10 shadow-xl mb-8" style={{boxShadow: '0 0 32px 8px #ffe06655'}}>
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="size-7 text-yellow-400 drop-shadow-glow" />
            <span className="text-lg font-semibold text-yellow-300 tracking-wide">NGC Wallet</span>
          </div>
          <div className="text-4xl font-extrabold text-white tracking-tight mb-2">
            {balance} <span className="text-yellow-400">NGC</span>
          </div>
          <div className="text-md text-yellow-100/80 mb-6">{fiat}</div>
          <div className="flex gap-3 mb-8">
            <button className="flex-1 rounded-full bg-yellow-400 text-black font-bold py-2.5 px-6 hover:bg-yellow-300 transition shadow-glow">Pay Fare</button>
            <button className="flex-1 rounded-full bg-black/60 border border-yellow-400 text-yellow-300 font-semibold py-2.5 px-6 hover:bg-yellow-400 hover:text-black transition">Receive</button>
            <button className="flex-1 rounded-full bg-black/60 border border-yellow-400 text-yellow-300 font-semibold py-2.5 px-6 hover:bg-yellow-400 hover:text-black transition">Top Up</button>
          </div>
          <div>
            <div className="text-md font-semibold mb-3 text-primary">Recent Transactions</div>
            <div className="space-y-3">
              {transactions.map((t, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-background/80 border border-border px-4 py-3 text-sm">
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">{t.type}</span>
                    <span className="text-muted-foreground text-xs">{t.desc}</span>
                  </div>
                  <div className={`font-bold ${t.amount.startsWith('+') ? 'text-green-500' : 'text-red-400'}`}>{t.amount}</div>
                  <span className="text-muted-foreground text-xs w-20 text-right">{t.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const [showDashboard, setShowDashboard] = React.useState(false);
  React.useEffect(() => {
    const handler = () => setShowDashboard(true);
    window.addEventListener("nganya:open-dashboard", handler);
    return () => window.removeEventListener("nganya:open-dashboard", handler);
  }, []);
  return (
    <main className="min-h-screen bg-background text-foreground">
      {showDashboard ? (
        <PassengerDashboardLayout />
      ) : (
        <>
          <Navbar />
          <Hero />
          <Features />
          <HowItWorks />
          <Benefits />
          <WalletPreview />
          <CTA />
          <Footer />
        </>
      )}
    </main>
  );
}
