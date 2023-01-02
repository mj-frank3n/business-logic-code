import { Product } from '../src/types.js';

export const ClassicAd: Product = Object.freeze({
  id: 'classic-ad',
  name: 'Classic Ad',
  description: 'Offers the most basic level of advertisement',
  retailPrice: 26999,
});

export const StandOutAd: Product = Object.freeze({
  id: 'stand-out-ad',
  name: 'Stand Out Ad',
  description: 'Allows advertisers to use a company logo and use a longer presentation text',
  retailPrice: 32299,
});

export const PremiumAd: Product = Object.freeze({
  id: 'premium-ad',
  name: 'Premium Ad',
  description: 'Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility',
  retailPrice: 39499,
});
