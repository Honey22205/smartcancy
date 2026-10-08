/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, TabKey } from './components/Navbar';
import { CustomerSimulator } from './components/CustomerSimulator';
import { LogisticsVisualizer } from './components/LogisticsVisualizer';
import { DecisionEngine } from './components/DecisionEngine';
import { HubRackManager } from './components/HubRackManager';
import { ScoreCalculator } from './components/ScoreCalculator';
import { ArchitectureViewer } from './components/ArchitectureViewer';
import { MetricsAndRoi } from './components/MetricsAndRoi';
import { IdeaDocument } from './components/IdeaDocument';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('app');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRunDemo = () => {
    showToast('Starting end-to-end Smart Cancel flow: Customer Mobile Simulator');
    setActiveTab('app');
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.2 },
      colors: ['#F59E0B', '#10B981'],
    });
  };

  const handleReset = () => {
    showToast('Simulation parameters restored to baseline.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-200">
      {/* Top Bar Contract (Zone 1: Wordmark — Zone 2: Nav Links — Zone 3: Primary Actions) */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onRunDemo={handleRunDemo}
        onReset={handleReset}
      />

      {/* Floating Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-medium shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'app' && (
          <CustomerSimulator
            onCancelComplete={(data) => {
              if (data.nudgeAction === 'keep') {
                showToast(`Nudge succeeded: Customer preserved order for ${data.product.name}!`);
              } else if (data.matched) {
                showToast(`Local Re-Match Found! Saved ${data.product.extraDistanceKm} km return travel.`);
              } else {
                showToast(`Standard warehouse return initiated for ${data.product.name}.`);
              }
            }}
          />
        )}

        {activeTab === 'visualizer' && <LogisticsVisualizer />}

        {activeTab === 'decision' && <DecisionEngine />}

        {activeTab === 'racks' && <HubRackManager />}

        {activeTab === 'score' && <ScoreCalculator />}

        {activeTab === 'architecture' && <ArchitectureViewer />}

        {activeTab === 'roi' && <MetricsAndRoi />}

        {activeTab === 'document' && <IdeaDocument onNavigateTab={setActiveTab} />}
      </main>

      {/* Editorial Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-semibold text-white">Smart Cancel</span>
            <span>·</span>
            <span>Turning cancelled orders into useful deliveries</span>
          </div>

          <div className="text-center sm:text-right text-slate-400">
            <span className="text-amber-400 font-semibold">Made by Team for AWS Hackathon</span>
            <span className="mx-2">·</span>
            <span>"We do not stop cancellations. We make them cheaper."</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
