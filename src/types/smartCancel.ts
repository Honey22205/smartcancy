export type FulfillmentStageId = 'ordered' | 'packed' | 'in_transit' | 'last_mile';

export interface FulfillmentStage {
  id: FulfillmentStageId;
  name: string;
  scoreRange: string;
  minScore: number;
  maxScore: number;
  defaultScore: number;
  description: string;
  costImpact: string;
  color: string;
}

export interface DemoProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  isEligible: boolean;
  ineligibilityReason?: string;
  demandRate: 'high' | 'medium' | 'low';
  packagingDescription: string;
  boxWeightKg: number;
  extraDistanceKm: number;
  co2SavedKg: number;
  imageEmoji: string;
  deliveryTimeText: string;
  hubPincode: string;
}

export interface HubSlot {
  id: string;
  slotCode: string;
  parcelId: string;
  productName: string;
  category: string;
  pincode: string;
  sealVerified: boolean;
  sealPhotoStatus: 'verified' | 'pending' | 'flagged';
  holdHoursRemaining: number;
  holdHoursMax: number;
  demandScore: number;
  isOccupied: boolean;
  matchedOrderId?: string;
  isDispatched?: boolean;
}

export interface DecisionStepState {
  stage: FulfillmentStageId;
  irreversibilityScore: number;
  nudgeAction: 'keep' | 'cancel' | 'pending';
  isEligible: boolean;
  demandScore: number;
  sealIntact: boolean;
  outcome: 'stop_early' | 'nudge_worked' | 'held_and_rematched' | 'warehouse_fallback';
}

export interface AbTestMetrics {
  totalOrders: number;
  totalCancels: number;
  nudgeShownCount: number;
  nudgeSavedCount: number;
  parcelsHeldCount: number;
  parcelsRematchedCount: number;
  parcelsReturnedWarehouse: number;
  avgDistanceSavedKm: number;
  totalCo2SavedKg: number;
  packagingSavedUnits: number;
  costSavedDollars: number;
}
