import { PricingRuleType } from './pricing-rules/pricing-rule-factory.js';

export interface Product {
  id: string;
  name: string;
  description: string;
  retailPrice: number;
}

export interface Checkout {
  add(item: Product): void;
  total(): number;
}

export interface PricingRule {
  apply(checkoutItems: Product[]): number;
}

export interface PricingRuleConfig {
  type: PricingRuleType;
  specification: FixedPriceRuleSpecification | FreeItemsRuleSpecification;
}

export interface CustomerPricing {
  customerName: string;
  config: PricingRuleConfig[];
}


export interface FreeItemsRuleSpecification {
  productId: string,
  applicableToItemCount: number;
  freeItemsCountToGrant: number;
}

export interface FixedPriceRuleSpecification {
  productId: string,
  fixedPrice: number;
}
