import { useState, useEffect, useMemo } from 'react';
import { PLATFORM_CATALOG } from '../data/platformCatalog';

// Helper: Normalize names for matching (e.g., "Spotify Premium" -> "spotify")
const normalizeName = (name) => {
  const lower = name.toLowerCase();
  // Simple heuristic: check if catalog name is contained in user sub name
  const match = PLATFORM_CATALOG.find(p => lower.includes(p.name.toLowerCase()));
  return match ? match : null;
};

export function useSavingsEngine(userSubscriptions) {
  const [recommendations, setRecommendations] = useState([]);
  const [totalPotentialSavings, setTotalPotentialSavings] = useState(0);

  // Run analysis when subscriptions change
  useEffect(() => {
    if (!userSubscriptions || userSubscriptions.length === 0) {
      setRecommendations([]);
      setTotalPotentialSavings(0);
      return;
    }

    const newRecommendations = [];
    let totalSavings = 0;

    // 1. Map User Subs to Catalog Entries
    const mappedSubs = userSubscriptions.map(sub => {
      const catalogEntry = normalizeName(sub.nombre || sub.name);
      return {
        ...sub,
        catalogId: catalogEntry?.id,
        catalogData: catalogEntry,
        monthlyCost: sub.precio || sub.price || 0,
        cycle: sub.ciclo || sub.cycle || 'month' // Default to month if unknown
      };
    });

    // ---------------------------------------------------------
    // ALGORITHM A: ANNUAL SWITCH (High Impact, High Ease)
    // ---------------------------------------------------------
    mappedSubs.forEach(sub => {
      if (sub.cycle === 'month' && sub.catalogData) {
        // Check if catalog has an annual plan
        const annualPlan = sub.catalogData.plans.find(p => p.interval === 'year');
        if (annualPlan) {
          const currentYearlyCost = sub.monthlyCost * 12;
          const newYearlyCost = annualPlan.price;
          const savings = currentYearlyCost - newYearlyCost;

          if (savings > 0) {
            newRecommendations.push({
              id: `annual_${sub.id}`,
              type: 'annual_switch',
              title: `Switch ${sub.catalogData.name} to Annual`,
              description: `Pay yearly to save ${(savings / 12).toFixed(2)}€/month.`,
              platformName: sub.catalogData.name,
              currentCost: currentYearlyCost,
              newCost: newYearlyCost,
              savingsYearly: savings,
              easeScore: 90, // Very easy to do
              actionLabel: 'View Annual Plan'
            });
            totalSavings += savings;
          }
        }
      }
    });

    // ---------------------------------------------------------
    // ALGORITHM B: OVERLAP DETECTION (Medium Impact, Low Ease)
    // ---------------------------------------------------------
    const categoryGroups = {};
    mappedSubs.forEach(sub => {
      if (sub.catalogData) {
        const cat = sub.catalogData.category;
        if (!categoryGroups[cat]) categoryGroups[cat] = [];
        categoryGroups[cat].push(sub);
      }
    });

    Object.entries(categoryGroups).forEach(([category, subs]) => {
      if (subs.length > 1) {
        // Found Overlap (e.g., 2 Music Streaming services)
        // Calculate potential savings: remove the cheaper one(s)
        // Sort by price descending
        const sortedSubs = [...subs].sort((a, b) => b.monthlyCost - a.monthlyCost);
        const keptSub = sortedSubs[0]; // Keep most expensive (presumably main one) or just flagging
        const redundantSubs = sortedSubs.slice(1);
        
        const monthlyWaste = redundantSubs.reduce((acc, s) => acc + s.monthlyCost, 0);
        const yearlyWaste = monthlyWaste * 12;

        newRecommendations.push({
          id: `overlap_${category}`,
          type: 'overlap',
          title: `Duplicate ${category.replace('_', ' ')} Subscriptions`,
          description: `You have ${subs.length} services for ${category.replace('_', ' ')}. Consider consolidating.`,
          platformName: keptSub.catalogData.name, // Main one
          involvedPlatforms: subs.map(s => s.catalogData.name).join(', '),
          savingsYearly: yearlyWaste,
          easeScore: 40, // Harder decision (which one to cancel?)
          actionLabel: 'Review Subscriptions'
        });
        totalSavings += yearlyWaste;
      }
    });

    // ---------------------------------------------------------
    // ALGORITHM C: BUNDLE OPPORTUNITY (High Impact, Medium Ease)
    // ---------------------------------------------------------
    // Check if user has multiple services that could form a bundle
    // Iterate through catalog to find bundles
    PLATFORM_CATALOG.forEach(platform => {
      if (platform.part_of_bundles) {
        platform.part_of_bundles.forEach(bundle => {
            // Check if user has the main platform AND any partner
            const userHasMain = mappedSubs.find(s => s.catalogId === platform.id);
            if (!userHasMain) return;

            // Check partners
            const userPartners = bundle.partners.map(pId => mappedSubs.find(s => s.catalogId === pId)).filter(Boolean);
            
            if (userPartners.length > 0) {
                // User has at least 2 parts of the bundle
                const currentCost = userHasMain.monthlyCost + userPartners.reduce((acc, s) => acc + s.monthlyCost, 0);
                const bundleCost = bundle.price; // Monthly bundle price
                
                const monthlySavings = currentCost - bundleCost;
                
                if (monthlySavings > 0) {
                    newRecommendations.push({
                        id: `bundle_${bundle.bundle_id}`,
                        type: 'bundle',
                        title: `Bundle Opportunity: ${bundle.name}`,
                        description: `${bundle.savings_text}. Combine ${platform.name} and ${userPartners.map(p => p.catalogData.name).join(' & ')}.`,
                        platformName: platform.name,
                        savingsYearly: monthlySavings * 12,
                        easeScore: 70, // Medium ease
                        actionLabel: 'View Bundle Deal'
                    });
                    totalSavings += (monthlySavings * 12);
                }
            }
        });
      }
    });

    // ---------------------------------------------------------
    // 3. PRIORITIZATION (Sorting)
    // ---------------------------------------------------------
    // Score = Savings ($) + Ease Score (0-100)
    // We weigh savings slightly higher
    const sortedRecommendations = newRecommendations.sort((a, b) => {
        const scoreA = a.savingsYearly + a.easeScore;
        const scoreB = b.savingsYearly + b.easeScore;
        return scoreB - scoreA; // Descending
    });

    setRecommendations(sortedRecommendations);
    setTotalPotentialSavings(totalSavings);

  }, [userSubscriptions]);

  return {
    recommendations,
    totalPotentialSavings,
    count: recommendations.length
  };
}
