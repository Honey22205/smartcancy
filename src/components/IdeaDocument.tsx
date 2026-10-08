import React, { useState } from 'react';
import { TabKey } from './Navbar';
import { ChevronRight, ArrowRight, BookOpen, ExternalLink } from 'lucide-react';

interface IdeaDocumentProps {
  onNavigateTab: (tab: TabKey) => void;
}

export const IdeaDocument: React.FC<IdeaDocumentProps> = ({ onNavigateTab }) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  const sections = [
    { id: 1, title: '1. The problem' },
    { id: 2, title: '2. The solution: two layers' },
    { id: 3, title: '3. How it works' },
    { id: 4, title: '4. Fulfillment Irreversibility Score' },
    { id: 5, title: '5. What the customer sees (UI design)' },
    { id: 6, title: '6. Which parcels can be re-matched' },
    { id: 7, title: '7. System architecture' },
    { id: 8, title: '8. Data relations' },
    { id: 9, title: '9. Tech stack' },
    { id: 10, title: '10. Metrics and how we prove it' },
    { id: 11, title: '11. Risks and our answers' },
    { id: 12, title: '12. Why this is worth building' },
  ];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Amazon Hackathon Idea Document</span>
          <span aria-hidden="true">·</span>
          <span>Full Proposal</span>
          <span aria-hidden="true">·</span>
          <span>Logistics Innovation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Smart Cancel
        </h1>
        <p className="text-base text-amber-600 font-semibold mt-1">
          Turning cancelled orders into useful deliveries
        </p>
        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
          <span>AWS Hackathon idea document</span>
          <span>·</span>
          <span>Complete 12-Section Specification</span>
          <span>·</span>
          <span className="font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Made by Team for AWS Hackathon
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Table of contents sidebar */}
        <div className="lg:col-span-3 sticky top-20 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
            Table of Contents
          </div>
          <div className="space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSection(s.id);
                  const el = document.getElementById(`section-${s.id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                  activeSection === s.id
                    ? 'bg-amber-100 text-slate-950 font-bold border-l-2 border-amber-500'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className="truncate">{s.title}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
            ))}
          </div>

          <div className="pt-4 mt-4 border-t border-slate-200 px-3">
            <div className="text-xs font-bold text-slate-800 mb-2">Interactive Demos:</div>
            <div className="space-y-1.5">
              <button
                onClick={() => onNavigateTab('app')}
                className="w-full text-left text-xs text-amber-700 hover:text-amber-900 font-medium flex items-center gap-1.5"
              >
                <span>→ Open Customer App Mock</span>
              </button>
              <button
                onClick={() => onNavigateTab('visualizer')}
                className="w-full text-left text-xs text-amber-700 hover:text-amber-900 font-medium flex items-center gap-1.5"
              >
                <span>→ Open 3D Route Visualizer</span>
              </button>
              <button
                onClick={() => onNavigateTab('decision')}
                className="w-full text-left text-xs text-amber-700 hover:text-amber-900 font-medium flex items-center gap-1.5"
              >
                <span>→ Open Decision Flowchart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Document Content */}
        <div className="lg:col-span-9 space-y-12 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs">
          {/* SECTION 1 */}
          <section id="section-1" className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-xl font-bold text-slate-900">1. The problem</h2>
              <span className="text-xs font-mono text-slate-400">Page 2</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              When a customer cancels late (after the order is packed or on its way), the parcel keeps moving. It was already picked, packed, loaded and driven. Then it is sent back to the warehouse, inspected and put on a shelf again.
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="text-xs font-bold text-slate-800">This wastes:</div>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                <li>Picking and packing effort</li>
                <li>Packaging material</li>
                <li>Fuel and driver time for the trip out and the trip back</li>
                <li>Warehouse space and handling time for returns</li>
              </ul>
            </div>
            <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-xl">
              <p className="text-xs font-bold text-slate-900">
                Today a late cancellation is treated as a failed delivery. Our idea treats it as a logistics decision.
              </p>
              <blockquote className="text-xs italic text-amber-950 mt-1.5 font-medium">
                "We do not stop people from cancelling. We make cancelling cheaper for everyone: first with honest information, then with local re-matching."
              </blockquote>
              <p className="text-xs text-slate-600 mt-1">
                The customer keeps the full right to cancel, with no extra steps and no penalty.
              </p>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="section-2" className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-xl font-bold text-slate-900">2. The solution: two layers</h2>
              <span className="text-xs font-mono text-slate-400">Page 2</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Layer 1: Honest impact nudge (before cancelling)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  When a customer taps Cancel on an order that is already packed or dispatched, we show a short card with real numbers: extra distance, CO₂ from that extra travel, and packaging wasted. The Cancel button stays visible and works in one tap. This is information, not friction. No hidden buttons, no extra screens, no guilt wording.
                </p>
                <div className="text-xs font-bold text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200">
                  Goal: Some customers will think twice and keep the order, so the cancellation rate goes down.
                </div>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Layer 2: Local re-match (after cancelling)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If the customer still cancels, the parcel does not go straight back to the warehouse:
                </p>
                <ol className="text-xs text-slate-600 space-y-1 list-decimal pl-4">
                  <li>The parcel is held at the nearest delivery hub or station for a few days.</li>
                  <li>The system checks if someone nearby has ordered (or is likely to order) the same product.</li>
                  <li>If yes, the parcel is sent from the hub to that new customer.</li>
                  <li>If no match is found within the hold time, it goes back to the warehouse as usual.</li>
                </ol>
                <div className="text-xs font-bold text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200">
                  Result: One trip instead of two, no warehouse return, and new customer gets product faster.
                </div>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onNavigateTab('visualizer')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900"
              >
                <span>View Figure 1 3D Comparison Diagram</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* SECTION 3 */}
          <section id="section-3" className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-xl font-bold text-slate-900">3. How it works</h2>
              <span className="text-xs font-mono text-slate-400">Page 3</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Every cancel request goes through the same short chain of checks. Early cancels are simply stopped. Late cancels see the impact card, then pass an eligibility check and a demand check. Only a parcel that passes all of them is held for a new customer. Everything else follows today's normal return, so we are never worse than the current process.
            </p>
            <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400">Interactive Flowchart Simulator</div>
                <div className="text-xs text-slate-300">Test every branch of Figure 2 with live parameters</div>
              </div>
              <button
                onClick={() => onNavigateTab('decision')}
                className="px-3 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-300 transition-colors"
              >
                Launch Decision Engine
              </button>
            </div>
          </section>

          {/* SECTION 4 */}
          <section id="section-4" className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-xl font-bold text-slate-900">4. Fulfillment Irreversibility Score</h2>
              <span className="text-xs font-mono text-slate-400">Page 4</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              A simple 0 to 100 score that tells us how costly it is to cancel at this moment. It is used in two places: the customer sees it as a progress bar, and the system uses it to choose the cheapest action after a cancel.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-950">
                <div className="font-bold">Level 1: Ordered</div>
                <div className="font-mono text-[11px] text-emerald-700">0 to 25</div>
                <div className="text-[11px] mt-1">Easy to stop, almost no cost</div>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-amber-950">
                <div className="font-bold">Level 2: Picked / Packed</div>
                <div className="font-mono text-[11px] text-amber-700">26 to 50</div>
                <div className="text-[11px] mt-1">Packaging already used</div>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-300 rounded-lg text-orange-950">
                <div className="font-bold">Level 3: In Transit</div>
                <div className="font-mono text-[11px] text-orange-700">51 to 75</div>
                <div className="text-[11px] mt-1">Fuel & hub work already spent</div>
              </div>
              <div className="p-3 bg-rose-50 border border-rose-300 rounded-lg text-rose-950">
                <div className="font-bold">Level 4: Last Mile</div>
                <div className="font-mono text-[11px] text-rose-700">76 to 100</div>
                <div className="text-[11px] mt-1">Driver assigned, highest cost</div>
              </div>
            </div>
          </section>

          {/* SECTION 5 */}
          <section id="section-5" className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-xl font-bold text-slate-900">5. What the customer sees (UI design)</h2>
              <span className="text-xs font-mono text-slate-400">Page 5</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Three screens are enough for the prototype: Order tracker, Before you cancel (Honest impact nudge), and After cancelling (Live re-match status tracker).
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-700">
              <div className="font-bold text-slate-900">UI rules we follow:</div>
              <ul className="space-y-1 list-disc pl-4">
                <li>Cancel is always one tap away. Impact card has a Cancel anyway button of the same size as Keep my order.</li>
                <li>Only real numbers. No exaggerated claims. Estimates are clearly marked.</li>
                <li>No penalty wording. No countdown timers, no guilt messages.</li>
                <li>Savings are shown only when real. The green summary appears only after a match is found.</li>
                <li>The tracker bar uses plain words: Ordered, Packed, Transit, Last mile.</li>
              </ul>
            </div>
            <button
              onClick={() => onNavigateTab('app')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900"
            >
              <span>Test Interactive Customer Phone Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </section>

          {/* SECTION 6 */}
          <section id="section-6" className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-xl font-bold text-slate-900">6. Which parcels can be re-matched</h2>
              <span className="text-xs font-mono text-slate-400">Page 6</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Not everything can be given to another customer. We need clear rules. Food and perishables, personalized items, hygiene goods, broken seals, and size-specific fashion are excluded.
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
              <div className="font-bold text-slate-900">Deciding when to hold a parcel:</div>
              <p className="text-slate-600">Holding costs hub space, so we hold only when the demand score is high based on:</p>
              <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                <li>Orders for this product in the same and nearby pincodes in the last 7 to 30 days</li>
                <li>Cart and wishlist counts for this product nearby</li>
                <li>The product's normal sales rate in that area</li>
                <li>Distance from the hub to those pincodes</li>
              </ul>
            </div>
          </section>

          {/* SECTION 7, 8, 9 */}
          <section id="section-7" className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-xl font-bold text-slate-900">7, 8 & 9. Architecture, data relations & stack</h2>
              <span className="text-xs font-mono text-slate-400">Pages 7 & 8</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Decoupled architecture: Customer React app communicates with FastAPI API service, backed by the Decision Engine rule chain, PostgreSQL database, Redis hold timers (72h TTL), and Kafka event streaming.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigateTab('architecture')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900"
              >
                <span>View Full System Architecture & 6 Database Tables</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* SECTION 10, 11, 12 */}
          <section id="section-10" className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-xl font-bold text-slate-900">10, 11 & 12. Proof plan, risks & closing</h2>
              <span className="text-xs font-mono text-slate-400">Page 9</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              We validate the model through an A/B test (Group A with nudge vs Group B control), measuring cancellation rate, local re-match rate, kilometers saved, and warehouse return volume drop.
            </p>
            <div className="p-6 bg-slate-900 text-white rounded-xl space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Suggested Presentation Order
              </div>
              <ol className="text-xs text-slate-300 space-y-1 list-decimal pl-4">
                <li>The problem: what happens to a late-cancelled order today</li>
                <li>Our idea in one line</li>
                <li>Layer 1: the honest nudge (show the mock screens)</li>
                <li>Layer 2: local re-match (show the 3D comparison and flow)</li>
                <li>Irreversibility score</li>
                <li>Rules for eligible products</li>
                <li>Architecture, data relations and tech stack</li>
                <li>Metrics and proof plan</li>
                <li>Risks and answers</li>
                <li><strong>Closing line: We do not stop cancellations. We make them cheaper.</strong></li>
              </ol>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
