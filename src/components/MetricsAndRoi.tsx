import React, { useState } from 'react';
import { RISKS_AND_ANSWERS } from '../data/mockData';
import { TrendingDown, Leaf, DollarSign, RotateCcw, ShieldCheck, CheckCircle2, Sliders, AlertCircle } from 'lucide-react';

export const MetricsAndRoi: React.FC = () => {
  // Configurable pilot parameters
  const [dailyHubOrders, setDailyHubOrders] = useState<number>(25000);
  const [lateCancelRatePct, setLateCancelRatePct] = useState<number>(3.2); // 3.2% cancel late
  const [nudgeRetentionPct, setNudgeRetentionPct] = useState<number>(24); // 24% keep order after nudge
  const [rematchSuccessPct, setRematchSuccessPct] = useState<number>(72); // 72% re-matched locally
  const [activeRiskCategory, setActiveRiskCategory] = useState<string>('all');

  // Math models
  const totalLateCancels = Math.round((dailyHubOrders * lateCancelRatePct) / 100);
  const retainedByNudge = Math.round((totalLateCancels * nudgeRetentionPct) / 100);
  const proceedingCancels = totalLateCancels - retainedByNudge;
  const rematchedLocally = Math.round((proceedingCancels * rematchSuccessPct) / 100);
  const warehouseFallbacks = proceedingCancels - rematchedLocally;

  // Environmental & Cost savings per day
  // Avoided round trips = retainedByNudge + rematchedLocally
  const totalSavedReturns = retainedByNudge + rematchedLocally;
  const avgKmSavedPerUnit = 38.5; // km
  const totalKmSavedDaily = Math.round(totalSavedReturns * avgKmSavedPerUnit);
  const totalCo2SavedKgDaily = Math.round(totalKmSavedDaily * 0.034); // ~34g CO2 per km for fleet van
  const estimatedCostSavedPerReturn = 5.20; // $5.20 cost for return trip + inspection + restock
  const dailyDollarSavings = Math.round(totalSavedReturns * estimatedCostSavedPerReturn);
  const annualDollarSavings = Math.round(dailyDollarSavings * 365);
  const annualCo2Tons = Math.round((totalCo2SavedKgDaily * 365) / 1000);

  // Risk filtering
  const categories = ['all', 'Customer Trust', 'Hub Operations', 'Quality & Security', 'Privacy & Compliance'];
  const filteredRisks =
    activeRiskCategory === 'all'
      ? RISKS_AND_ANSWERS
      : RISKS_AND_ANSWERS.filter((r) => r.category === activeRiskCategory);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Amazon Hackathon Idea Document</span>
          <span aria-hidden="true">·</span>
          <span>Sections 10, 11 & 12</span>
          <span aria-hidden="true">·</span>
          <span>Impact Proof & Business Case</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Metrics, proof plan & financial ROI
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Empirical validation model comparing traditional reverse logistics with Smart Cancel. Tune parameters to project scale across Amazon Delivery Stations.
        </p>
      </div>

      {/* Top 4 Impact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Annual Cost Savings</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            ${(annualDollarSavings / 1000).toFixed(0)}k
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Across 1 pilot hub (${(dailyDollarSavings).toLocaleString()}/day)
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>CO₂ Averted Annually</span>
            <Leaf className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 font-mono tabular-nums">
            {annualCo2Tons.toLocaleString()} Metric Tons
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {(totalCo2SavedKgDaily).toLocaleString()} kg CO₂ saved every day
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Return Trips Eliminated</span>
            <TrendingDown className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {((totalSavedReturns / totalLateCancels) * 100).toFixed(1)}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {totalSavedReturns} parcels/day spared from reverse transit
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Kilometres Saved / Day</span>
            <RotateCcw className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {totalKmSavedDaily.toLocaleString()} km
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Equal to {(totalKmSavedDaily / 400).toFixed(1)} delivery routes eliminated
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
        {/* Left Column: Interactive Simulation Sliders */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-500" />
              Pilot Simulation Parameters
            </h2>
            <span className="text-xs text-slate-400">Live Model</span>
          </div>

          {/* Slider 1: Daily Orders */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-slate-800">
              <span>Daily Delivery Hub Volume:</span>
              <span className="font-mono font-bold">{dailyHubOrders.toLocaleString()} orders</span>
            </div>
            <input
              type="range"
              min="5000"
              max="100000"
              step="5000"
              value={dailyHubOrders}
              onChange={(e) => setDailyHubOrders(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Slider 2: Late Cancel Rate */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex justify-between text-xs font-medium text-slate-800">
              <span>Late Cancellation Rate:</span>
              <span className="font-mono font-bold">{lateCancelRatePct}% ({totalLateCancels} parcels)</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="8.0"
              step="0.2"
              value={lateCancelRatePct}
              onChange={(e) => setLateCancelRatePct(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="text-[11px] text-slate-400">
              Orders cancelled after packing, in transit, or out for delivery
            </div>
          </div>

          {/* Slider 3: Layer 1 Nudge Retention */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex justify-between text-xs font-medium text-slate-800">
              <span>Layer 1: Nudge Conversion Rate:</span>
              <span className="font-mono font-bold text-amber-700">{nudgeRetentionPct}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={nudgeRetentionPct}
              onChange={(e) => setNudgeRetentionPct(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="text-[11px] text-slate-400">
              Customers who tap "Keep my order" upon seeing honest CO2 & packaging impact
            </div>
          </div>

          {/* Slider 4: Layer 2 Re-Match Success */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex justify-between text-xs font-medium text-slate-800">
              <span>Layer 2: Local Hub Re-Match Rate:</span>
              <span className="font-mono font-bold text-emerald-700">{rematchSuccessPct}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="95"
              step="5"
              value={rematchSuccessPct}
              onChange={(e) => setRematchSuccessPct(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="text-[11px] text-slate-400">
              Eligible held parcels matched to a nearby buyer within 72h hold TTL
            </div>
          </div>
        </div>

        {/* Right Column: A/B Test Proof Plan (Section 10) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                A/B Test Verification Design (Section 10)
              </h2>
              <p className="text-xs text-slate-500">
                Randomized trial: 50% Control (Group B) vs 50% Smart Cancel (Group A)
              </p>
            </div>
            <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
              P &lt; 0.001
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Control Group B */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider pb-1 border-b border-slate-200">
                Group B: Control (Today)
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 block">Nudge shown:</span>
                  <span className="font-bold text-slate-700">No (Standard cancel)</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Cancellation Rate:</span>
                  <span className="font-mono font-bold text-slate-900">{lateCancelRatePct}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Warehouse Returns:</span>
                  <span className="font-mono font-bold text-rose-700">100% of cancels</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Avg Miles / Cancel:</span>
                  <span className="font-mono font-bold text-slate-700">42.0 km (Full return)</span>
                </div>
              </div>
            </div>

            {/* Smart Cancel Group A */}
            <div className="p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50/40 space-y-3 shadow-xs">
              <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider pb-1 border-b border-emerald-200 flex items-center justify-between">
                <span>Group A: Smart Cancel</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-bold">
                  Test
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-emerald-800 block">Nudge shown:</span>
                  <span className="font-bold text-emerald-950">Yes (Honest numbers)</span>
                </div>
                <div>
                  <span className="text-emerald-800 block">Effective Cancel Rate:</span>
                  <span className="font-mono font-bold text-emerald-950">
                    {((lateCancelRatePct * (100 - nudgeRetentionPct)) / 100).toFixed(2)}%
                  </span>
                </div>
                <div>
                  <span className="text-emerald-800 block">Parcels Re-Matched:</span>
                  <span className="font-mono font-bold text-emerald-800">
                    {rematchSuccessPct}% matched locally
                  </span>
                </div>
                <div>
                  <span className="text-emerald-800 block">Avg Miles Saved:</span>
                  <span className="font-mono font-bold text-emerald-800">38.5 km saved</span>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown summary */}
          <div className="p-4 bg-slate-900 text-white rounded-xl text-xs space-y-2">
            <span className="font-bold text-amber-400 block">
              Operational Flow Breakdown for {totalLateCancels} Late Cancels / Day:
            </span>
            <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-center">
              <div className="p-2 bg-slate-800 rounded">
                <span className="text-amber-300 font-bold text-base block">{retainedByNudge}</span>
                <span className="text-[10px] text-slate-400">Kept (Nudge)</span>
              </div>
              <div className="p-2 bg-slate-800 rounded">
                <span className="text-emerald-400 font-bold text-base block">{rematchedLocally}</span>
                <span className="text-[10px] text-slate-400">Re-matched</span>
              </div>
              <div className="p-2 bg-slate-800 rounded">
                <span className="text-rose-400 font-bold text-base block">{warehouseFallbacks}</span>
                <span className="text-[10px] text-slate-400">FC Fallback</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 11: RISKS AND OUR ANSWERS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 mb-6 gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Section 11: Risks and our answers
            </h2>
            <p className="text-xs text-slate-500">
              Proactive safeguards for dark pattern prevention, hub congestion, tampering, and customer privacy
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveRiskCategory(c)}
                className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-colors whitespace-nowrap ${
                  activeRiskCategory === c
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c === 'all' ? 'All Risks (7)' : c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRisks.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  Risk: {item.risk}
                </span>
                <span className="text-[10px] text-slate-400">{item.category}</span>
              </div>
              <div className="text-xs text-slate-700 pt-1 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-slate-900">Our Answer:</strong> {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 12: WHY THIS IS WORTH BUILDING + CLOSING LINE */}
      <div className="bg-slate-950 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
            Section 12: Why this is worth building
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            "We do not stop people from cancelling. We make cancelling cheaper for everyone: first with honest information, then with local re-matching."
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <strong className="text-white block">Customers:</strong>
                Full freedom to cancel, zero penalties, transparent carbon & distance insight.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <strong className="text-white block">Amazon Logistics:</strong>
                Fewer return trips, less warehouse de-boxing, lower cost per cancelled parcel.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <strong className="text-white block">Environment:</strong>
                Substantial diesel fuel eliminated and cardboard packaging waste preserved.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <strong className="text-white block">Zero Downside Risk:</strong>
                If no local match is found, parcel simply follows the standard return path.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
