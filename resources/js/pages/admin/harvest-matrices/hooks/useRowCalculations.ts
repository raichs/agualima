import { useMemo } from 'react';

export const useRowCalculations = (currentRow: any) => {
    // Calcular Kg x Turno en tiempo real
    const kgPerTurno = useMemo(() => {
        if (!currentRow?.lots) return 0;

        const numDays = currentRow.lots[0]?.daily_data?.length || 0;
        const uniqueKgPerDayByDay: Set<number>[] = Array.from({ length: numDays }, () => new Set<number>());

        currentRow.lots.forEach((lot: any) => {
            if (lot.daily_data) {
                lot.daily_data.forEach((data: any, dayIndex: number) => {
                    const kgValue = data.kg_per_day === '' || data.kg_per_day === null || 
                        data.kg_per_day === undefined ? 0 : Number(data.kg_per_day);
                    if (kgValue > 0) {
                        uniqueKgPerDayByDay[dayIndex].add(kgValue);
                    }
                });
            }
        });

        return uniqueKgPerDayByDay.reduce((totalSum, daySet) => {
            const daySum = Array.from(daySet).reduce((sum, kg) => sum + kg, 0);
            return totalSum + daySum;
        }, 0);
    }, [currentRow]);

    // Calcular Kilos por lote
    const calculateKilosForLot = useMemo(() => {
        if (!currentRow?.lots) return [];

        const totalLines = currentRow.lots.reduce((sum: number, lot: any) => {
            const lines = lot.lines === '' || lot.lines === null || 
                lot.lines === undefined ? 0 : Number(lot.lines);
            return sum + lines;
        }, 0);

        return currentRow.lots.map((lot: any) => {
            if (totalLines === 0 || kgPerTurno === 0) return 0;

            const lotLines = lot.lines === '' || lot.lines === null || 
                lot.lines === undefined ? 0 : Number(lot.lines);
            return (kgPerTurno * lotLines) / totalLines;
        });
    }, [currentRow, kgPerTurno]);

    // Calcular Jornales por lote
    const calculateShiftsForLot = useMemo(() => {
        if (!currentRow?.lots) return [];

        return currentRow.lots.map((lot: any, lotIndex: number) => {
            const kilos = calculateKilosForLot[lotIndex] || 0;
            const kgPerShiftAvg = lot.kg_per_shift_avg === '' || lot.kg_per_shift_avg === null || 
                lot.kg_per_shift_avg === undefined ? 0 : Number(lot.kg_per_shift_avg);

            if (kgPerShiftAvg === 0) return 0;

            return Math.ceil(kilos / kgPerShiftAvg);
        });
    }, [currentRow, calculateKilosForLot]);

    return { kgPerTurno, calculateKilosForLot, calculateShiftsForLot };
};
