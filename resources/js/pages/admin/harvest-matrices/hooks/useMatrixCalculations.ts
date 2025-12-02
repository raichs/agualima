import { useMemo } from 'react';

interface DateInfo {
    day_of_week: number;
    date: string;
    day_name: string;
}

export const useMatrixCalculations = (watchedRows: any[], defaultDates: DateInfo[]) => {
    // Calcular totales para cada fila
    const rowTotals = useMemo(() => {
        return watchedRows?.map((row) => {
            if (!row?.lots) return { totalKilos: 0, kgPerShiftAvg: 0, totalShifts: 0, kgPerTurno: 0 };

            let totalKilos = 0;
            let totalFrequency = 0;
            let totalShifts = 0;

            const numDays = row.lots[0]?.daily_data?.length || 0;
            const uniqueKgPerDayByDay: Set<number>[] = Array.from({ length: numDays }, () => new Set<number>());

            row.lots.forEach((lot: any) => {
                if (lot.daily_data) {
                    const lotKilos = lot.daily_data.reduce((sum: number, data: any) => 
                        sum + ((data.frequency || 0) * (data.kg_per_day || 0)), 0);
                    const lotFrequency = lot.daily_data.reduce((sum: number, data: any) => 
                        sum + (data.frequency || 0), 0);
                    const lotShifts = lot.daily_data.reduce((sum: number, data: any) => 
                        sum + (data.shifts || 0), 0);

                    totalKilos += lotKilos;
                    totalFrequency += lotFrequency;
                    totalShifts += lotShifts;

                    lot.daily_data.forEach((data: any, dayIndex: number) => {
                        const kgValue = data.kg_per_day === '' || data.kg_per_day === null || 
                            data.kg_per_day === undefined ? 0 : Number(data.kg_per_day);
                        if (kgValue > 0) {
                            uniqueKgPerDayByDay[dayIndex].add(kgValue);
                        }
                    });
                }
            });

            const kgPerShiftAvg = totalFrequency > 0 ? totalKilos / totalFrequency : 0;
            const kgPerTurno = uniqueKgPerDayByDay.reduce((totalSum, daySet) => {
                const daySum = Array.from(daySet).reduce((sum, kg) => sum + kg, 0);
                return totalSum + daySum;
            }, 0);

            return { totalKilos, kgPerShiftAvg, totalShifts, kgPerTurno };
        }) || [];
    }, [watchedRows]);

    // Calcular totales generales de toda la tabla
    const tableTotals = useMemo(() => {
        const numDays = defaultDates.length;
        const dailyUniqueKgPerDay: Set<number>[] = Array.from({ length: numDays }, () => new Set<number>());
        const dailyUniqueShifts: Set<number>[] = Array.from({ length: numDays }, () => new Set<number>());
        let totalKilos = 0;
        let totalShifts = 0;
        let totalKgPerTurno = 0;

        watchedRows?.forEach((row: any) => {
            if (row?.lots) {
                const numDays = row.lots[0]?.daily_data?.length || 0;
                const uniqueKgPerDayByDay: Set<number>[] = Array.from({ length: numDays }, () => new Set<number>());

                row.lots.forEach((lot: any) => {
                    const lotKilos = lot.total_kilos || 0;
                    const lotShifts = lot.total_shifts || 0;
                    totalKilos += Number(lotKilos);
                    totalShifts += Number(lotShifts);

                    if (lot.daily_data) {
                        lot.daily_data.forEach((data: any, dayIndex: number) => {
                            const kgValue = data.kg_per_day === '' || data.kg_per_day === null || 
                                data.kg_per_day === undefined ? 0 : Number(data.kg_per_day);
                            const shiftsValue = data.shifts === '' || data.shifts === null || 
                                data.shifts === undefined ? 0 : Number(data.shifts);
                            
                            if (kgValue > 0) {
                                dailyUniqueKgPerDay[dayIndex].add(kgValue);
                                uniqueKgPerDayByDay[dayIndex].add(kgValue);
                            }
                            if (shiftsValue > 0) {
                                dailyUniqueShifts[dayIndex].add(shiftsValue);
                            }
                        });
                    }
                });

                const rowKgPerTurno = uniqueKgPerDayByDay.reduce((totalSum, daySet) => {
                    const daySum = Array.from(daySet).reduce((sum, kg) => sum + kg, 0);
                    return totalSum + daySum;
                }, 0);
                totalKgPerTurno += rowKgPerTurno;
            }
        });

        const dailyTotals = Array.from({ length: numDays }, (_, dayIndex) => {
            const kgPerDay = Array.from(dailyUniqueKgPerDay[dayIndex]).reduce((sum, kg) => sum + kg, 0);
            const shifts = Array.from(dailyUniqueShifts[dayIndex]).reduce((sum, shift) => sum + shift, 0);
            return { kgPerDay, shifts };
        });

        const dailyKgPerShift = dailyTotals.map(day => {
            if (day.shifts === 0) return 0;
            return Math.round(day.kgPerDay / day.shifts);
        });

        return { totalKilos, totalShifts, totalKgPerTurno, dailyTotals, dailyKgPerShift };
    }, [watchedRows, defaultDates]);

    return { rowTotals, tableTotals };
};
