import { useMemo, useState } from 'react';
import {
    getDashboardSummary,
    getSpendingCurve,
    getCategoryBreakdown,
    getSavingsTimeline
} from '../services/dashboardService';

export function useDashboardData(subscriptions) {
    const [curveRange, setCurveRange] = useState('12m');

    const data = useMemo(() => {
        if (!subscriptions || subscriptions.length === 0) {
            return {
                summary: { currentMonthSpend: 0, activeSubscriptionsCount: 0, monthOverMonthChange: 0 },
                curveData: [],
                categoryBreakdown: [],
                savingsTimeline: { timeline: [], events: [] }
            };
        }

        return {
            summary: getDashboardSummary(subscriptions),
            curveData: getSpendingCurve(subscriptions, { range: curveRange }),
            categoryBreakdown: getCategoryBreakdown(subscriptions),
            savingsTimeline: getSavingsTimeline(subscriptions)
        };
    }, [subscriptions, curveRange]);

    return {
        ...data,
        curveRange,
        setCurveRange,
        dashboardLoading: false,
        error: null
    };
}
