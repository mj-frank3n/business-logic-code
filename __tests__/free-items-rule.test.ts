import { FreeItemsRule } from '../src/pricing-rules/free-items-rule.js';
import { ClassicAd, PremiumAd, StandOutAd } from '../stubs/product-stubs.js';
import { Product } from '../src/types.js';

const rangeOfClassicAds = (length: number): Product[] => [...Array(length).keys()].map(() => ClassicAd);

describe('given a free items rule', () => {
  describe('when rule is set grant 1 free item for every 3 items in checkout (aka 3 for 2)', () => {
    const rule = new FreeItemsRule({
      productId: ClassicAd.id,
      applicableToItemCount: 3,
      freeItemsCountToGrant: 1,
    });

    describe('when no items of matching product type are supplied', () => {
      it('should return no discount', () => {
        expect(rule.apply([StandOutAd, PremiumAd, PremiumAd])).toEqual(0);
      });
    });

    describe('when 3 items of matching product type are supplied', () => {
      it('should return discount worth 1 item', () => {
        expect(rule.apply(rangeOfClassicAds(3))).toEqual(ClassicAd.retailPrice);
      });

      describe('when any of the matching items have different pricing than the rest of items', () => {
        it('should throw', () => {
          expect(() => {
            rule.apply([ClassicAd, {
              ...ClassicAd,
              retailPrice: 12345
            }]);
          }).toThrow();
        });
      });
    });

    describe('when 4 items of matching product type are supplied', () => {
      it('should return discount worth 1 item', () => {
        expect(rule.apply(rangeOfClassicAds(4))).toEqual(ClassicAd.retailPrice);
      });
    });

    describe('when less than 3 items of matching product type are supplied', () => {
      it('should not return no discount', () => {
        expect(rule.apply([ClassicAd, ClassicAd, PremiumAd])).toEqual(0);
      });
    });

    describe('when 6 items of matching product type are supplied', () => {
      it('should discount worth 2 items', () => {
        expect(rule.apply(rangeOfClassicAds(6))).toEqual(ClassicAd.retailPrice * 2);
      });
    });
  });
});
