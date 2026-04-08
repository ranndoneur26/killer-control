// Mock Database of Platforms for the Savings Engine
export const PLATFORM_CATALOG = [
  {
    id: 'spotify',
    name: 'Spotify',
    category: 'music_streaming',
    plans: [
      { id: 'individual_monthly', name: 'Individual', price: 10.99, interval: 'month' },
      { id: 'individual_annual', name: 'Individual (Annual)', price: 119.99, interval: 'year' }, // ~9.99/mo
      { id: 'duo_monthly', name: 'Duo', price: 14.99, interval: 'month' },
      { id: 'family_monthly', name: 'Family', price: 16.99, interval: 'month' }
    ]
  },
  {
    id: 'apple_music',
    name: 'Apple Music',
    category: 'music_streaming',
    plans: [
      { id: 'individual_monthly', name: 'Individual', price: 10.99, interval: 'month' },
      { id: 'individual_annual', name: 'Individual (Annual)', price: 109.00, interval: 'year' },
      { id: 'family_monthly', name: 'Family', price: 16.99, interval: 'month' }
    ],
    part_of_bundles: [
      {
        bundle_id: 'apple_one_individual',
        name: 'Apple One',
        partners: ['apple_tv', 'apple_arcade', 'icloud'],
        price: 19.95,
        savings_text: 'Includes Music, TV+, Arcade & iCloud'
      }
    ]
  },
  {
    id: 'disney_plus',
    name: 'Disney+',
    category: 'video_streaming',
    plans: [
      { id: 'basic_monthly', name: 'Basic (Ads)', price: 7.99, interval: 'month' },
      { id: 'premium_monthly', name: 'Premium', price: 13.99, interval: 'month' },
      { id: 'premium_annual', name: 'Premium (Annual)', price: 139.99, interval: 'year' } // Save ~27
    ],
    part_of_bundles: [
      {
        bundle_id: 'disney_hulu_duo',
        name: 'Duo Premium',
        partners: ['hulu'],
        price: 19.99,
        savings_text: 'Combine Disney+ and Hulu'
      }
    ]
  },
  {
    id: 'hulu',
    name: 'Hulu',
    category: 'video_streaming',
    plans: [
      { id: 'ads_monthly', name: 'With Ads', price: 7.99, interval: 'month' },
      { id: 'no_ads_monthly', name: 'No Ads', price: 17.99, interval: 'month' }
    ]
  },
  {
    id: 'netflix',
    name: 'Netflix',
    category: 'video_streaming',
    plans: [
      { id: 'standard_monthly', name: 'Standard', price: 15.49, interval: 'month' },
      { id: 'premium_monthly', name: 'Premium', price: 22.99, interval: 'month' }
    ]
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    category: 'cloud_storage',
    plans: [
      { id: 'plus_monthly', name: 'Plus', price: 11.99, interval: 'month' },
      { id: 'plus_annual', name: 'Plus (Annual)', price: 119.88, interval: 'year' } // 9.99/mo
    ]
  }
];
