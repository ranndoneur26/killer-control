/**
 * @fileoverview
 * Core business logic for Killer Control subscription analysis.
 *
 * @module analyzeSubscription
 */

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Format an ISO date string to a locale-friendly short date.
 * @param {string} isoDate
 * @returns {string}  e.g. "1 mar. 2024"
 */
function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Return the sorted price history (oldest → newest).
 * @param {import('../types/subscription').PriceHistoryEntry[]} history
 * @returns {import('../types/subscription').PriceHistoryEntry[]}
 */
function sortHistory(history) {
  return [...history].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

// ─── Main function ─────────────────────────────────────────────────────────────

/**
 * Analyse a subscription and return a structured result with:
 *  - Price increase detection
 *  - Cheaper alternatives (filtered + sorted by saving)
 *  - Promo-expiry detection
 *  - Value score
 *  - A single primary alert (most severe / relevant)
 *
 * @param {import('../types/subscription').Subscription} sub
 * @returns {import('../types/subscription').SubscriptionAnalysis}
 */
export function analyzeSubscription(sub) {
  const history      = sub.priceHistory ?? [];
  const currentPrice = sub.amount;
  const threshold    = sub.analysis?.priceIncreaseThreshold ?? 5;

  // ── 1. Detect price increase ─────────────────────────────────────────────
  let priceIncreasePercent = 0;
  let priceIncreaseSince   = undefined;

  if (history.length >= 2) {
    const sorted        = sortHistory(history);
    const previousPrice = sorted[sorted.length - 2].amount;
    const latestEntry   = sorted[sorted.length - 1];

    if (currentPrice > previousPrice) {
      priceIncreasePercent = Math.round(
        ((currentPrice - previousPrice) / previousPrice) * 100
      );
      priceIncreaseSince = latestEntry.date;
    }
  }

  const hasPriceIncrease = priceIncreasePercent >= threshold;

  // ── 2. Enrich & filter alternatives ─────────────────────────────────────
  const alternatives = (sub.analysis?.alternatives ?? [])
    .map(alt => ({
      ...alt,
      savings:       parseFloat((currentPrice - alt.price).toFixed(2)),
      annualSavings: parseFloat(((currentPrice - alt.price) * 12).toFixed(2)),
    }))
    .filter(alt => alt.savings > 0)            // only cheaper ones
    .sort((a, b) => b.savings - a.savings);    // best deal first

  // ── 3. Detect promo expiry ───────────────────────────────────────────────
  let promoAlert         = false;
  let daysUntilPromoEnd  = Infinity;

  if (sub.promo?.promoEndDate) {
    const msLeft = new Date(sub.promo.promoEndDate).getTime() - Date.now();
    daysUntilPromoEnd = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
    promoAlert = daysUntilPromoEnd <= 30;
  }

  // ── 4. Value score ───────────────────────────────────────────────────────
  const usageScore = sub.analysis?.usageScore ?? 3;
  const valueScore = parseFloat((usageScore / currentPrice * 10).toFixed(2));

  // ── 5. Build primary alert (highest priority first) ──────────────────────
  let alert = undefined;

  if (hasPriceIncrease) {
    const severity =
      priceIncreasePercent >= 20 ? 'high'
      : priceIncreasePercent >= 10 ? 'medium'
      : 'low';

    alert = {
      type: 'price_increase',
      severity,
      message: `Han aumentado la cuota un ${priceIncreasePercent}% desde ${formatDate(priceIncreaseSince)}. ¿Todavía le sacas partido?`,
    };
  } else if (promoAlert) {
    const regularPrice = sub.promo.regularPrice;
    const severity     = daysUntilPromoEnd <= 7 ? 'high' : 'medium';

    alert = {
      type: 'promo_ending',
      severity,
      message: `Tu promoción acaba en ${daysUntilPromoEnd} días. El precio pasará a ${regularPrice}€/mes.`,
    };
  } else if (usageScore <= 2) {
    alert = {
      type: 'low_usage',
      severity: 'low',
      message: `Usas poco este servicio. Estás pagando ${(currentPrice * 12).toFixed(0)}€/año.`,
    };
  }

  return {
    hasPriceIncrease,
    priceIncreasePercent,
    priceIncreaseSince,
    alternatives,
    promoAlert,
    daysUntilPromoEnd,
    valueScore,
    alert,
  };
}

// ─── Convenience helpers ───────────────────────────────────────────────────────

/**
 * Run analyzeSubscription on a list and return only those with an active alert,
 * sorted by severity (high → medium → low).
 *
 * @param {import('../types/subscription').Subscription[]} subscriptions
 * @returns {{ sub: import('../types/subscription').Subscription, analysis: import('../types/subscription').SubscriptionAnalysis }[]}
 */
export function getAlertedSubscriptions(subscriptions) {
  const SEVERITY_ORDER = { high: 0, medium: 1, low: 2 };

  return subscriptions
    .map(sub => ({ sub, analysis: analyzeSubscription(sub) }))
    .filter(({ analysis }) => !!analysis.alert)
    .sort((a, b) =>
      SEVERITY_ORDER[a.analysis.alert.severity] -
      SEVERITY_ORDER[b.analysis.alert.severity]
    );
}

/**
 * Calculate the total potential monthly saving from all alternatives
 * across a list of subscriptions.
 *
 * @param {import('../types/subscription').Subscription[]} subscriptions
 * @returns {number}
 */
export function totalPotentialSavings(subscriptions) {
  return subscriptions.reduce((acc, sub) => {
    const { alternatives } = analyzeSubscription(sub);
    const best = alternatives[0]; // already sorted by savings desc
    return acc + (best?.savings ?? 0);
  }, 0);
}
