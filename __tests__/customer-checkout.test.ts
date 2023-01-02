import { CustomerCheckout } from '../src/customer-checkout.js';
import { ClassicAd, PremiumAd, StandOutAd } from '../stubs/product-stubs.js';
import {
  AxilCoffeeRoastersPricingRulesConfig,
  MyerPricingRulesConfig,
  SecondBitePricingRulesConfig
} from '../stubs/pricing-rules-stubs.js';
import { PricingRuleFactory, PricingRuleType } from '../src/pricing-rules/pricing-rule-factory.js';

describe('given a checkout process', () => {
  describe('when no pricing rules are provided', () => {
    describe('when multiple products are added', () => {
      it('should return total price of all added products', () => {
        const customerCheckout = new CustomerCheckout();
        customerCheckout.add(ClassicAd);
        customerCheckout.add(StandOutAd);
        customerCheckout.add(PremiumAd);
        expect(customerCheckout.total()).toEqual(98797);
      });
    });
  });

  describe('when single pricing rule is provided', () => {
    it('should apply the pricing rule to checkout total price', () => {
      const secondBiteCheckout = new CustomerCheckout(PricingRuleFactory.create(SecondBitePricingRulesConfig));
      secondBiteCheckout.add(ClassicAd);
      secondBiteCheckout.add(ClassicAd);
      secondBiteCheckout.add(ClassicAd);
      secondBiteCheckout.add(PremiumAd);
      expect(secondBiteCheckout.total()).toEqual(93497);

      const axilCoffeeRoastersCheckout = new CustomerCheckout(PricingRuleFactory.create(AxilCoffeeRoastersPricingRulesConfig));
      axilCoffeeRoastersCheckout.add(StandOutAd);
      axilCoffeeRoastersCheckout.add(StandOutAd);
      axilCoffeeRoastersCheckout.add(StandOutAd);
      axilCoffeeRoastersCheckout.add(PremiumAd);
      expect(axilCoffeeRoastersCheckout.total()).toEqual(129496);
    });
  });

  describe('when multiple pricing rules are provided', () => {
    it('should apply the pricing to checkout total price', () => {
      const myerCheckout = new CustomerCheckout(PricingRuleFactory.create(MyerPricingRulesConfig));
      myerCheckout.add(StandOutAd);
      myerCheckout.add(StandOutAd);
      myerCheckout.add(StandOutAd);
      myerCheckout.add(StandOutAd);
      myerCheckout.add(StandOutAd);
      myerCheckout.add(PremiumAd);
      expect(myerCheckout.total()).toEqual(168195);
    });
  });

  describe('when multiple rules are applied to a single item type', () => {
    it('should throw', () => {
      expect(() => {
        new CustomerCheckout(PricingRuleFactory.create({
          customerName: 'Illegal Config',
          config: [{
            type: PricingRuleType.FREE_ITEMS,
            specification: {
              productId: StandOutAd.id,
              applicableToItemCount: 2,
              freeItemsCountToGrant: 1
            }
          }, {
            type: PricingRuleType.FIXED_PRICE,
            specification: {
              productId: StandOutAd.id,
              fixedPrice: 100
            }
          }]
        }));
      }).toThrow('Multiple pricing rules per product are not allowed');
    });
  });
});
