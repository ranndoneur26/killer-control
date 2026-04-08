export function getDashboardSummary(subscriptions) {
    let currentMonthSpend = 0;
    let activeCount = 0;

    subscriptions.forEach(sub => {
        if (sub.estado === 'cancelada' || sub.estado === 'cancelled') return;

        activeCount++;

        // Normalize to monthly
        if (sub.ciclo === 'Annual' || sub.ciclo === 'Anual') {
            currentMonthSpend += (sub.precio / 12);
        } else {
            currentMonthSpend += sub.precio;
        }
    });

    return {
        currentMonthTotal: currentMonthSpend,
        previousMonthTotal: currentMonthSpend,
        monthOverMonthChange: 0,
        currentMonthSpend: currentMonthSpend,
        activeSubscriptionsCount: activeCount
    };
}

export function getSpendingCurve(subscriptions, { range = '12m' }) {
    const summary = getDashboardSummary(subscriptions);
    const burnRate = summary.currentMonthTotal;

    const result = [];
    const currentMonth = new Date().getMonth();
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    const count = range === '6m' ? 6 : 12;
    for (let i = count - 1; i >= 0; i--) {
        let index = currentMonth - i;
        if (index < 0) index += 12;
        result.push({
            month: monthNames[index],
            total: burnRate
        });
    }
    return result;
}

export function getCategoryBreakdown(subscriptions) {
    const breakdown = {};
    let totalSpend = 0;

    subscriptions.forEach(sub => {
        if (sub.estado === 'cancelada' || sub.estado === 'cancelled') return;

        const normalizedPrice = (sub.ciclo === 'Annual' || sub.ciclo === 'Anual') ? (sub.precio / 12) : sub.precio;
        const cat = sub.categoria || 'Other';

        if (!breakdown[cat]) breakdown[cat] = 0;
        breakdown[cat] += normalizedPrice;
        totalSpend += normalizedPrice;
    });

    return Object.keys(breakdown).map(cat => ({
        category: cat,
        total: breakdown[cat],
        percentage: totalSpend > 0 ? (breakdown[cat] / totalSpend) : 0
    })).sort((a, b) => b.total - a.total);
}

export function getSavingsTimeline(subscriptions) {
    return {
        timeline: [
            { month: 'Ene', totalSavings: 0 },
            { month: 'Feb', totalSavings: 9.99 },
            { month: 'Mar', totalSavings: 25.98 }
        ],
        events: []
    };
}
