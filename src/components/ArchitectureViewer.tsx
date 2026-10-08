import React, { useState } from 'react';
import { SCHEMA_TABLES } from '../data/mockData';
import { Database, Server, Smartphone, Cpu, ArrowRight, Layers, Table, Sparkles } from 'lucide-react';

export const ArchitectureViewer: React.FC = () => {
  const [activeSchemaTab, setActiveSchemaTab] = useState<string>('ORDER');
  const [activeSubView, setActiveSubView] = useState<'architecture' | 'schema' | 'stack'>('architecture');

  const selectedTable = SCHEMA_TABLES.find((t) => t.name === activeSchemaTab) || SCHEMA_TABLES[0];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Amazon Hackathon Idea Document</span>
            <span aria-hidden="true">·</span>
            <span>Sections 7, 8 & 9</span>
            <span aria-hidden="true">·</span>
            <span>Engineering Blueprint</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            System architecture & data relations
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            A lightweight, decoupled pipeline that integrates seamlessly into existing fulfillment pipelines. Customer app, FastAPI backend, Decision Engine rules, and streaming Redis/Kafka state.
          </p>
        </div>

        {/* View switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setActiveSubView('architecture')}
            className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
              activeSubView === 'architecture'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            System Pipeline (Fig 6)
          </button>
          <button
            onClick={() => setActiveSubView('schema')}
            className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
              activeSubView === 'schema'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Data Relations (Fig 7)
          </button>
          <button
            onClick={() => setActiveSubView('stack')}
            className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
              activeSubView === 'stack'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tech Stack (Sec 9)
          </button>
        </div>
      </div>

      {/* VIEW 1: SYSTEM ARCHITECTURE (Figure 6) */}
      {activeSubView === 'architecture' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center justify-between">
              <span>Figure 6: Components & Direction of Data</span>
              <span className="text-xs font-normal text-slate-500">
                Live parcel scan events flow directly into the Decision Engine
              </span>
            </h2>

            {/* 4 Architecture Columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Column 1: Customer */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-slate-900 font-bold text-xs uppercase tracking-wider">
                  <Smartphone className="w-4 h-4 text-amber-500" />
                  <span>1. Customer App</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 block">Mobile UI</span>
                    <span className="text-slate-500 text-[11px]">React Native / React SPA</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 block">Order Tracker</span>
                    <span className="text-slate-500 text-[11px]">Dynamic stage progress bar</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 block">Honest Impact Card</span>
                    <span className="text-slate-500 text-[11px]">Transparent CO2 & distance</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 block">Cancel / Re-Match</span>
                    <span className="text-slate-500 text-[11px]">Live state verification</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Backend */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-slate-900 font-bold text-xs uppercase tracking-wider">
                  <Server className="w-4 h-4 text-blue-500" />
                  <span>2. Backend API</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 block">FastAPI / Node.js</span>
                    <span className="text-slate-500 text-[11px]">Async cancel event router</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 block">Emission Engine</span>
                    <span className="text-slate-500 text-[11px]">EPA fleet factor x vehicle km</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 block">Distance Matrix</span>
                    <span className="text-slate-500 text-[11px]">FC to hub to delivery address</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 block">A/B Testing Gate</span>
                    <span className="text-slate-500 text-[11px]">Controlled nudge allocation</span>
                  </div>
                </div>
              </div>

              {/* Column 3: Decision Engine */}
              <div className="bg-amber-50/70 border border-amber-300 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-amber-200 text-amber-950 font-bold text-xs uppercase tracking-wider">
                  <Cpu className="w-4 h-4 text-amber-600" />
                  <span>3. Decision Engine</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-white rounded-lg border border-amber-200 text-xs">
                    <span className="font-bold text-slate-900 block">Irreversibility Score</span>
                    <span className="text-slate-500 text-[11px]">0-100 staging threshold</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-amber-200 text-xs">
                    <span className="font-bold text-slate-900 block">Eligibility Rules</span>
                    <span className="text-slate-500 text-[11px]">Tamper seal & perishable check</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-amber-200 text-xs">
                    <span className="font-bold text-slate-900 block">Demand Predictor</span>
                    <span className="text-slate-500 text-[11px]">Pincode carts & 30d order rate</span>
                  </div>
                  <div className="p-3 bg-amber-400 text-slate-950 rounded-lg font-bold text-xs shadow-xs">
                    <span className="block">Action Router</span>
                    <span className="text-[10px] font-normal opacity-90">Dispatch / Hold / Fallback</span>
                  </div>
                </div>
              </div>

              {/* Column 4: Data + Ops */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-slate-900 font-bold text-xs uppercase tracking-wider">
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>4. Data & Ops</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 block">PostgreSQL</span>
                    <span className="text-slate-500 text-[11px]">Orders, parcels, cancel events</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 block">Redis TTL</span>
                    <span className="text-slate-500 text-[11px]">72h hub hold countdown keys</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 block">Kafka Stream</span>
                    <span className="text-slate-500 text-[11px]">Hub scanner barcode events</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 block">Grafana Ops</span>
                    <span className="text-slate-500 text-[11px]">Real-time station capacity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Used Table (Section 7) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Data Ingestion Model (Section 7)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Order Data</span>
                <p className="text-slate-600">Payment mode, order timestamp, cart changes, product classification category.</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Fulfillment Data</span>
                <p className="text-slate-600">Stage timestamps, optical package scans, carrier handoffs, real-time GPS location.</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Demand Data</span>
                <p className="text-slate-600">Recent orders in same/adjacent pincodes, cart and wishlist signals by geography.</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Cancellation History</span>
                <p className="text-slate-600">Stage at which buyers cancel, item return velocity, and response to impact nudges.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: DATA RELATIONS SCHEMA (Figure 7 & Section 8) */}
      {activeSubView === 'schema' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-6">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Figure 7: Data Relations (How the pieces connect)
                </h2>
                <p className="text-xs text-slate-500">
                  Six simple normalized tables power the prototype state machine
                </p>
              </div>

              {/* Table selector pills */}
              <div className="flex items-center gap-1">
                {SCHEMA_TABLES.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setActiveSchemaTab(t.name)}
                    className={`px-2.5 py-1 text-xs font-mono font-bold rounded cursor-pointer transition-colors ${
                      activeSchemaTab === t.name
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Entity Relationship Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SCHEMA_TABLES.map((table) => {
                const isSelected = activeSchemaTab === table.name;
                return (
                  <div
                    key={table.name}
                    onClick={() => setActiveSchemaTab(table.name)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-400/30 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                      <span className="font-mono font-bold text-sm text-slate-900">
                        {table.name}
                      </span>
                      <Table className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <p className="text-xs text-slate-600 mb-3">{table.description}</p>

                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Fields:
                      </div>
                      <div className="font-mono text-[11px] text-slate-700 space-y-0.5">
                        {table.fields.map((f, i) => (
                          <div key={i} className="truncate">
                            • {f}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                        Relations:
                      </div>
                      <div className="text-[11px] text-slate-600">
                        {table.relations.join(' · ')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: TECH STACK BREAKDOWN (Section 9 Table) */}
      {activeSubView === 'stack' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs animate-in fade-in">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h2 className="text-sm font-bold text-slate-900">
              Section 9: Suggested Tech Stack Breakdown
            </h2>
            <p className="text-xs text-slate-500">
              Pragmatic, production-ready stack for hackathon demo and pilot rollout
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left divide-y divide-slate-200">
              <thead className="bg-slate-50 text-slate-700 font-semibold">
                <tr>
                  <th className="py-3 px-4">Component</th>
                  <th className="py-3 px-4">Suggested Tools</th>
                  <th className="py-3 px-4">Role & Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Customer App Mock</td>
                  <td className="py-3 px-4 font-mono text-slate-600">React, Tailwind CSS, Lucide</td>
                  <td className="py-3 px-4">Order tracker, honest impact card, 1-tap cancel UI</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Backend API</td>
                  <td className="py-3 px-4 font-mono text-slate-600">Python (FastAPI) or Node.js</td>
                  <td className="py-3 px-4">Handles cancel requests and invokes decision logic</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Database & Caching</td>
                  <td className="py-3 px-4 font-mono text-slate-600">PostgreSQL, Redis</td>
                  <td className="py-3 px-4">Orders and parcels; fast lookups and 72h hold TTL timers</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Event Streaming</td>
                  <td className="py-3 px-4 font-mono text-slate-600">Kafka or AWS Kinesis</td>
                  <td className="py-3 px-4">Real-time parcel barcode scans and stage transition events</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Decision Engine</td>
                  <td className="py-3 px-4 font-mono text-slate-600">Python rule chain / XGBoost</td>
                  <td className="py-3 px-4">Evaluates irreversibility, optical seal check, and eligibility</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Demand Prediction</td>
                  <td className="py-3 px-4 font-mono text-slate-600">Regression / Time-series</td>
                  <td className="py-3 px-4">Forecasts nearby buyer likelihood per pincode cluster</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Emissions Engine</td>
                  <td className="py-3 px-4 font-mono text-slate-600">Distance x Fleet factor (EPA)</td>
                  <td className="py-3 px-4">Calculates honest real-time CO2 numbers on impact card</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Cloud Infrastructure</td>
                  <td className="py-3 px-4 font-mono text-slate-600">AWS (Lambda / ECS, DynamoDB)</td>
                  <td className="py-3 px-4">Serverless deployment across delivery station zones</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">A/B Testing Engine</td>
                  <td className="py-3 px-4 font-mono text-slate-600">Controlled bucket routing</td>
                  <td className="py-3 px-4">Empirically measures cancellation rate drop vs control group</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
