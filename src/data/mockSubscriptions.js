/**
 * @fileoverview
 * Enriched mock subscription data using the full Subscription model.
 * Includes priceHistory, analysis (alternatives, usageScore), and promo blocks.
 *
 * @type {import('../types/subscription').Subscription[]}
 */
export const MOCK_SUBSCRIPTIONS = [
  // ─── 1. Netflix ── price increased 28%, low usage ────────────────────────
  {
    id: '1',
    name: 'Netflix',
    category: 'Entretenimiento',
    amount: 17.99,
    renewalDate: '2026-03-19',
    website: 'https://www.netflix.com',
    priceHistory: [
      { date: '2022-01-01', amount: 12.99, reason: 'Alta inicial' },
      { date: '2023-06-01', amount: 14.99, reason: 'Subida anual' },
      { date: '2024-10-01', amount: 17.99, reason: 'Actualización plan Estándar' },
    ],
    analysis: {
      priceIncreaseThreshold: 5,
      alternatives: [
        {
          name: 'Disney+',
          price: 8.99,
          url: 'https://www.disneyplus.com',
          planEquivalent: '4K, 4 pantallas, sin anuncios',
          savings: 9.0,
          note: 'Incluye Star+ (contenido adulto y deportes)',
        },
        {
          name: 'Apple TV+',
          price: 9.99,
          url: 'https://tv.apple.com',
          planEquivalent: '4K, 6 usuarios de familia',
          savings: 8.0,
          note: 'Gratis 3 meses al comprar dispositivo Apple',
        },
        {
          name: 'Prime Video',
          price: 4.99,
          url: 'https://primevideo.com',
          planEquivalent: '4K, incluido con Amazon Prime',
          savings: 13.0,
        },
      ],
      usageScore: 2,
    },
  },

  // ─── 2. Spotify ── promo acabando en 12 días ──────────────────────────────
  {
    id: '2',
    name: 'Spotify',
    category: 'Música',
    amount: 1.99,
    renewalDate: '2026-03-24',
    website: 'https://www.spotify.com',
    priceHistory: [
      { date: '2025-09-24', amount: 1.99, reason: 'Oferta de retención 3 meses' },
    ],
    promo: {
      promoPrice: 1.99,
      regularPrice: 11.99,
      promoEndDate: '2026-03-24',   // ~12 days from now → promoAlert = true
    },
    analysis: {
      priceIncreaseThreshold: 5,
      alternatives: [
        {
          name: 'YouTube Music',
          price: 10.99,
          url: 'https://music.youtube.com',
          planEquivalent: 'Sin anuncios, descarga, YouTube Premium incluido',
          savings: 1.0,
        },
        {
          name: 'Amazon Music Unlimited',
          price: 9.99,
          url: 'https://music.amazon.com',
          planEquivalent: '100M canciones, sin anuncios',
          savings: 2.0,
          note: 'Descuento con Amazon Prime',
        },
      ],
      usageScore: 5,
    },
  },

  // ─── 3. Xbox Game Pass ── precio estable, uso alto ────────────────────────
  {
    id: '3',
    name: 'Xbox Game Pass Ultimate',
    category: 'Gaming',
    amount: 14.99,
    renewalDate: '2026-03-18',
    website: 'https://www.xbox.com/es-ES/xbox-game-pass',
    priceHistory: [
      { date: '2023-01-01', amount: 12.99, reason: 'Alta inicial' },
      { date: '2023-09-01', amount: 14.99, reason: 'Subida de precio global' },
    ],
    analysis: {
      priceIncreaseThreshold: 5,
      alternatives: [
        {
          name: 'PlayStation Plus Essential',
          price: 8.99,
          url: 'https://www.playstation.com/ps-plus',
          planEquivalent: '3 juegos/mes, multijugador online',
          savings: 6.0,
          note: 'Solo compatible con PlayStation',
        },
        {
          name: 'EA Play Pro',
          price: 14.99,
          url: 'https://www.ea.com/ea-play',
          planEquivalent: 'Catálogo EA completo, PC',
          savings: 0,   // same price, filtered out
        },
      ],
      usageScore: 4,
    },
  },

  // ─── 4. Adobe Creative Cloud ── gran subida, uso bajo ────────────────────
  {
    id: '4',
    name: 'Adobe Creative Cloud',
    category: 'Productividad',
    amount: 54.99,
    renewalDate: '2026-04-01',
    website: 'https://www.adobe.com',
    priceHistory: [
      { date: '2021-01-01', amount: 29.99, reason: 'Plan Individual inicial' },
      { date: '2022-06-01', amount: 34.99, reason: 'Actualización de tarifa' },
      { date: '2023-11-01', amount: 44.99, reason: 'Subida anual Adobe' },
      { date: '2024-11-01', amount: 54.99, reason: 'Subida anual Adobe (+22%)' },
    ],
    analysis: {
      priceIncreaseThreshold: 5,
      alternatives: [
        {
          name: 'Affinity Suite',
          price: 3.74,   // ~44.99€/año → ~3.74€/mes
          url: 'https://affinity.serif.com',
          planEquivalent: 'Photo + Designer + Publisher (equivalente a PS+AI+ID)',
          savings: 51.25,
          note: 'Pago único anual disponible. Sin suscripción mensual.',
        },
        {
          name: 'Canva Pro',
          price: 12.99,
          url: 'https://www.canva.com',
          planEquivalent: 'Diseño gráfico simplificado, templates, Brand Kit',
          savings: 42.0,
          note: 'Más limitado, pero suficiente para no-diseñadores',
        },
      ],
      usageScore: 2,
    },
  },

  // ─── 5. iCloud+ 200GB ── sano, sin alertas ───────────────────────────────
  {
    id: '5',
    name: 'iCloud+ 200 GB',
    category: 'Utilidades',
    amount: 2.99,
    renewalDate: '2026-03-15',
    website: 'https://www.apple.com/icloud',
    priceHistory: [
      { date: '2022-03-01', amount: 2.99, reason: 'Alta inicial' },
    ],
    analysis: {
      priceIncreaseThreshold: 5,
      alternatives: [
        {
          name: 'Google One 200GB',
          price: 2.99,
          url: 'https://one.google.com',
          planEquivalent: '200GB Google Drive + Gmail + Fotos',
          savings: 0,   // same price, filtered out
        },
      ],
      usageScore: 5,
    },
  },
];
