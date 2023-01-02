import { FixedPriceRule } from '../src/pricing-rules/fixed-price-rule.js';
import { PremiumAd, StandOutAd } from '../stubs/product-stubs.js';

describe('given a fixed price rule', () => {
  const rule = new FixedPriceRule({
    productId: PremiumAd.id,
    fixedPrice: 10000,
  });

  describe('when any of the matching items have different pricing than the rest of items', () => {
    it('should throw', () => {
      expect(() => {
        rule.apply([PremiumAd, {
          ...PremiumAd,
          retailPrice: 12345
        }]);
      }).toThrow();
    });
  });

  describe('when an item of matching product type is supplied', () => {
    it('should return difference between original price and fixed discounted price', () => {
      expect(rule.apply([PremiumAd])).toEqual(PremiumAd.retailPrice - 10000);
    });
  });

  describe('when no items of matching product type are supplied', () => {
    it('should return no discount', () => {
      expect(rule.apply([StandOutAd])).toEqual(0);
    });
  });

  describe('when multiple items of matching product type are supplied', () => {
    it('should return aggregated difference between original price and fixed discounted price', () => {
      expect(rule.apply([PremiumAd, PremiumAd])).toEqual((PremiumAd.retailPrice * 2) - 20000);
    });
  });

  describe('when configured fixed price is higher than default retail price', () => {
    it('should return no discount', () => {
      const rule = new FixedPriceRule({
        productId: PremiumAd.id,
        fixedPrice: PremiumAd.retailPrice + 10000,
      });

      expect(rule.apply([PremiumAd])).toEqual(0);
    });
  });
});
