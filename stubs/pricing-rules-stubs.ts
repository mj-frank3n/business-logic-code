import { ClassicAd, PremiumAd, StandOutAd } from './product-stubs.js';
import { PricingRuleType } from '../src/pricing-rules/pricing-rule-factory.js';
import { CustomerPricing } from '../src/types.js';

export const SecondBitePricingRulesConfig: CustomerPricing = Object.freeze({
  customerName: 'Second Bite',
  config: [{
    type: PricingRuleType.FREE_ITEMS,
    specification: {
      productId: ClassicAd.id,
      applicableToItemCount: 3,
      freeItemsCountToGrant: 1,
    }
  }]
});

export const AxilCoffeeRoastersPricingRulesConfig: CustomerPricing = Object.freeze({
  customerName: 'Axil Coffee Roasters',
  config: [{
    type: PricingRuleType.FIXED_PRICE,
    specification: {
      productId: StandOutAd.id,
      fixedPrice: 29999
    }
  }]
});

export const MyerPricingRulesConfig: CustomerPricing = Object.freeze({
  customerName: 'Myer',
  config: [{
    type: PricingRuleType.FREE_ITEMS,
    specification: {
      productId: StandOutAd.id,
      applicableToItemCount: 5,
      freeItemsCountToGrant: 1,
    }
  }, {
    type: PricingRuleType.FIXED_PRICE,
    specification: {
      productId: PremiumAd.id,
      fixedPrice: 38999
    }
  }]
});
