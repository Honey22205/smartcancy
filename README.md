# Smart Cancel 📦⚡

> **Turning Cancelled Orders into Useful Deliveries**  
> *AWS Hackathon Project | Sustainable Logistics & Reverse Fulfillment Innovation*  
> **Made by Team for AWS Hackathon**

---

## 🏆 Project Overview

When a customer cancels an online delivery late (after an order is packed, in linehaul transit, or loaded onto a last-mile delivery van), the package keeps moving. Traditional reverse logistics treats a cancellation as a **failed delivery**: the parcel is driven back, unloaded at a regional fulfillment center, unboxed, inspected, restocked, and re-shelved days later.

**Smart Cancel treats late cancellation as a logistics optimization decision.**

> *"We do not stop people from cancelling. We make cancelling cheaper for everyone: first with honest information, then with local re-matching."*

The customer keeps the unconditional right to cancel with 1-tap simplicity and zero penalties, while the logistics network saves up to **85% of return travel**, eliminates unnecessary carton waste, and delivers parcels same-day to nearby customers who want them.

---

## 👥 Credits

**Made by Team for AWS Hackathon**  
- **Track**: Logistics Optimization, Cloud Architecture & Environmental Sustainability  
- **Submission Type**: Working Interactive Full-Stack Prototype & Simulation Engine  
- **Core Principle**: Anti-Dark Pattern UX with Algorithmic Re-Dispatch

---

## 💡 The Two-Layer Architecture

Smart Cancel operates across two complementary layers:

```
                          ┌──────────────────────────┐
                          │   Customer taps Cancel   │
                          └─────────────┬────────────┘
                                        │
                         Check Irreversibility Score
                                        │
             ┌──────────────────────────┴──────────────────────────┐
             ▼ (Score 0–50: Ordered/Packed)                        ▼ (Score 51–100: Transit/Last Mile)
┌──────────────────────────┐                              ┌──────────────────────────┐
│   Early Cancel Stopped   │                              │  Layer 1: Honest Nudge   │
│   (Zero transport cost)  │                              │  (Real CO2, KM, carton)  │
└──────────────────────────┘                              └─────────────┬────────────┘
                                                                        │
                                                            Customer Decision?
                                                                        │
                                              ┌─────────────────────────┴─────────────────────────┐
                                              ▼ Kept Order                                        ▼ Cancelled Anyway
                                 ┌──────────────────────────┐                        ┌──────────────────────────┐
                                 │   Order Continues Run    │                        │  Layer 2: Local Re-Match │
                                 │      (Nudge worked!)     │                        │  (Check Seal & Demand)   │
                                 └──────────────────────────┘                        └─────────────┬────────────┘
                                                                                                   │
                                                                                    Eligible & High Demand?
                                                                                                   │
                                                                        ┌──────────────────────────┴──────────────────────────┐
                                                                        ▼ Yes                                                 ▼ No
                                                           ┌──────────────────────────┐                          ┌──────────────────────────┐
                                                           │  Hold at Local Station   │                          │ Normal Warehouse Return  │
                                                           │  Match & Local Dispatch  │                          │      (Safe Fallback)     │
                                                           └──────────────────────────┘                          └──────────────────────────┘
```

### Layer 1: Honest Impact Nudge (Pre-Cancellation)
When a customer requests cancellation for an order that is already in transit or out for delivery, Smart Cancel presents an **Honest Impact Card**:
- **Real calculated numbers**: Distance diverted (e.g. `~12.4 km`), estimated carbon emissions (e.g. `~0.42 kg CO₂`), and physical packaging consumed.
- **Zero dark patterns**: The "Cancel anyway" button is of equal visual prominence and size as "Keep my order".
- **No guilt phrasing or artificial countdown timers**. Cancellation is always one tap away with an instant refund guarantee.

### Layer 2: Local Hub Re-Match (Post-Cancellation)
If the customer proceeds with cancellation:
1. The parcel is diverted to the nearest **Local Delivery Station / Hub** rather than routed all the way back to the primary Fulfillment Center.
2. An automated optical barcode and seal integrity scan verifies that the carton remains unopened.
3. The parcel is held in a local staging rack backed by an **AWS ElastiCache (Redis) TTL hold timer (max 72 hours)**.
4. If a matching customer order arrives in the same or adjacent pincode cluster, the parcel's shipping label is automatically reprinted and re-dispatched.
5. If no match occurs within the hold TTL, the parcel is batched with scheduled linehaul freight back to the warehouse (ensuring performance is never worse than today's baseline).

---

## 📊 Fulfillment Irreversibility Score (0 to 100)

The **Fulfillment Irreversibility Score** quantifies how costly and wasteful a cancellation is at any given point in the order lifecycle:

| Level | Fulfillment Stage | Score Range | Operational Meaning | Action Taken |
| :--- | :--- | :--- | :--- | :--- |
| **Level 1** | **Ordered** | `0 – 25` | Easy to stop; no linehaul fuel or driver assignment | Stop order immediately; zero reverse cost |
| **Level 2** | **Picked / Packed** | `26 – 50` | Physical box, thermal label, and tape consumed | Stop before dock load; restock locally |
| **Level 3** | **In Transit** | `51 – 75` | Linehaul freight fuel spent; hub scan recorded | Show honest impact nudge; intercept at delivery station |
| **Level 4** | **Last Mile** | `76 – 100` | Driver assigned; package loaded on van | Show honest impact nudge; hold at local station for re-match |

$$\text{Irreversibility Score} = S_{\text{base}} + P_{\text{carton}} + \min\left(10, \lfloor d \times 0.15 \rfloor\right) + D_{\text{assigned}}$$

Where:
- $S_{\text{base}} \in \{12, 38, 64, 88\}$
- $P_{\text{carton}}$ is packaging penalty (Mailer: `0`, Standard box: `+4`, Heavy carton: `+9`)
- $d$ is distance traveled from fulfillment center in kilometers
- $D_{\text{assigned}} = 6$ if van driver is dispatched on active route

---

## 🛡️ Eligibility Matrix: Which Parcels Qualify?

To preserve customer trust, security, and quality control, strict eligibility rules govern which cancelled parcels can be held for re-matching:

### ✅ Eligible Items
- **Sealed, unopened parcels**: Original tape and tamper-evident seals intact.
- **Non-perishable shelf goods**: Shelf-stable items requiring no temperature monitoring.
- **High-demand velocity categories**: Consumer electronics, Kindle devices, books, cables, phone accessories, and household staples.

### ❌ Ineligible Items (Automatic Return Fallback)
- **Perishables & fresh groceries**: Fresh produce, cold-chain dairy, or frozen foods.
- **Personalized or customized goods**: Engraved hardware or custom-printed products.
- **Hygiene & personal care**: Intimate apparel, opened cosmetics, test kits.
- **Tampered or damaged packaging**: Any parcel with broken tape, tears, or transit crushed edges.
- **Size-specific fashion**: Footwear and fitted apparel (unless an exact identical SKU/size match exists concurrently in the local station queue).

---

## ☁️ AWS Cloud Architecture

Smart Cancel is designed natively for AWS services to achieve low-latency event processing and high availability:

```
 [ Customer Client ]
   React / Next.js
          │ (HTTPS)
          ▼
 [ Amazon API Gateway ]
          │
          ▼
 [ AWS Lambda / Amazon ECS ] ─── (API Handlers & Decision Engine)
          │
    ┌─────┴──────────────────────────────┬──────────────────────────────┐
    ▼                                    ▼                              ▼
[ Amazon DynamoDB / RDS ]     [ Amazon ElastiCache (Redis) ]    [ Amazon Kinesis Data Streams ]
(Orders, Parcels, Events)      (72h TTL Hold Station Timers)    (Real-Time Scanner Telemetry)
                                                                        │
                                                                        ▼
                                                             [ Amazon CloudWatch ]
                                                              (Station Metrics & Grafana)
```

| AWS Service | Role in Smart Cancel |
| :--- | :--- |
| **AWS Lambda & ECS** | Executes serverless decision routing, emission calculations, and A/B test assignment. |
| **Amazon ElastiCache (Redis)** | Manages 72-hour TTL expiration keys for station holding racks and fast pincode lookup. |
| **Amazon RDS (PostgreSQL) / DynamoDB** | Persists normalized orders, parcels, cancel events, and re-match records. |
| **Amazon Kinesis Data Streams** | Ingests high-throughput optical barcode scans and stage transitions from station handhelds. |
| **Amazon S3** | Archives optical seal photos captured during station intake inspections. |
| **Amazon CloudWatch** | Monitors station rack saturation rates, hold times, and reverse trip reduction telemetry. |

---

## 🗄️ Relational Data Model (6 Tables)

The system relies on six normalized tables for tracking parcels and cancellation events:

1. **`ORDER`**: `order_id (PK)`, `customer_id`, `product_id`, `payment_mode`, `placed_at`
2. **`PARCEL`**: `parcel_id (PK)`, `order_id (FK)`, `stage`, `irreversibility_score`, `current_location`
3. **`HUB`**: `hub_id (PK)`, `pincode`, `capacity`, `free_slots`
4. **`CANCEL_EVENT`**: `cancel_id (PK)`, `order_id (FK)`, `stage_at_cancel`, `nudge_shown`, `kept_order`
5. **`REMATCH`**: `rematch_id (PK)`, `parcel_id (FK)`, `new_order_id (FK)`, `hold_hours`, `km_saved`
6. **`DEMAND_SIGNAL`**: `pincode (PK)`, `product_id (PK)`, `orders_last_30d`, `cart_count`

---

## 📈 Proven Impact & ROI Projection

Based on a representative Amazon delivery station handling **25,000 parcels/day**:

- **Late Cancellation Rate**: ~3.2% (800 parcels/day)
- **Layer 1 Retention**: 24% of customers choose to keep their order upon viewing honest impact metrics (192 parcels kept/day)
- **Layer 2 Re-Match Success**: 72% of remaining eligible parcels matched locally within 72h (438 parcels re-matched/day)
- **Daily Avoided Returns**: **630 parcels/day** spared from reverse linehaul return
- **Daily Fuel & Mileage Saved**: **24,250 km/day** (~60 delivery routes eliminated)
- **Carbon Averted**: **~300 Metric Tons of CO₂ annually** per station
- **Net Cost Savings**: **~$1.2M annually** in avoided reverse freight, unpacking labor, and restock handling

---

## 🛡️ Risk Mitigation Matrix

| Potential Risk | Smart Cancel Answer |
| :--- | :--- |
| **Nudge looks like a dark pattern** | Equal-dimension buttons, 1-tap cancellation, explicit estimate disclaimers, zero guilt copy or countdown timers. |
| **Held parcels congest delivery hubs** | Parcels are held only when demand score is high (30-day velocity > 75), with a strict 72-hour TTL timer before warehouse return. |
| **Parcel tampering risk** | Automated computer-vision optical seal inspection and photo verification before entering holding racks. |
| **Customer privacy on packaging** | Automated thermal label reprinting. The original label is shredded/covered so the new buyer never sees previous customer details. |
| **Zero nearby buyer demand** | Safe fallback: consolidated onto scheduled linehaul return to warehouse. We are never worse than today. |

---

## 🚀 Running the Prototype Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd smart-cancel

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access:
- **Customer App Simulator**: Test 1-tap cancellation and the Honest Impact Card.
- **Logistics 3D Route Visualizer**: Animated dual-path comparison of Legacy Return vs Smart Cancel.
- **Decision Engine Simulator**: Step through all 5 decision gates with interactive scenarios.
- **Hub Slots & Redis TTL Manager**: Monitor physical rack occupancy and trigger incoming order matching.
- **Fulfillment Irreversibility Calculator**: Calculate composite scores across different package stages.
- **Impact & ROI Dashboard**: Test customizable A/B parameters and compute financial savings.
- **Full 12-Section Hackathon Idea Document**: Executive-ready proposal reader.

---

## 🏁 Hackathon Closing Statement

> **"We do not stop cancellations. We make them cheaper."**

*Created with passion by Team for AWS Hackathon.*
