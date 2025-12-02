import React from 'react';

interface TableTotals {
    totalKilos: number;
    totalShifts: number;
    totalKgPerTurno: number;
    dailyTotals: Array<{ kgPerDay: number; shifts: number }>;
    dailyKgPerShift: number[];
}

interface TotalRowsProps {
    tableTotals: TableTotals;
}

export const TotalRows: React.FC<TotalRowsProps> = ({ tableTotals }) => {
    return (
        <>
            {/* Fila TOTAL */}
            <tr className="harvest-matrix__total-row harvest-matrix__total-row--total">
                <td colSpan={4} className="harvest-matrix__sticky-col harvest-matrix__sticky-col--variety" style={{ textAlign: 'center' }}>
                    TOTAL
                </td>
                <td className="harvest-matrix__sticky-col harvest-matrix__sticky-col--kilos" style={{ textAlign: 'center' }}>
                    {tableTotals.totalKilos.toFixed(2)}
                </td>
                <td className="harvest-matrix__sticky-col harvest-matrix__sticky-col--kg-avg" style={{ textAlign: 'center' }}>
                    -
                </td>
                <td className="harvest-matrix__sticky-col harvest-matrix__sticky-col--shifts" style={{ textAlign: 'center' }}>
                    {tableTotals.totalShifts.toFixed(0)}
                </td>
                <td className="harvest-matrix__sticky-col harvest-matrix__sticky-col--kg-turno" style={{ textAlign: 'center' }}>
                    {tableTotals.totalKgPerTurno.toFixed(2)}
                </td>
                {tableTotals.dailyTotals.map((dayTotal, dayIndex) => (
                    <React.Fragment key={`total-${dayIndex}`}>
                        <td style={{ padding: '8px', textAlign: 'center' }}>-</td>
                        <td style={{ padding: '8px', textAlign: 'center' }}>{dayTotal.kgPerDay.toFixed(2)}</td>
                        <td style={{ padding: '8px', textAlign: 'center' }}>{dayTotal.shifts.toFixed(0)}</td>
                    </React.Fragment>
                ))}
                <td style={{ padding: '8px', textAlign: 'center' }}>-</td>
            </tr>

            {/* Fila KG/JORNAL */}
            <tr className="harvest-matrix__total-row harvest-matrix__total-row--kg-jornal">
                <td colSpan={4} className="harvest-matrix__sticky-col harvest-matrix__sticky-col--variety" style={{ textAlign: 'center' }}>
                    KG/JORNAL
                </td>
                <td className="harvest-matrix__sticky-col harvest-matrix__sticky-col--kilos" style={{ textAlign: 'center' }}>
                    -
                </td>
                <td className="harvest-matrix__sticky-col harvest-matrix__sticky-col--kg-avg" style={{ textAlign: 'center' }}>
                    -
                </td>
                <td className="harvest-matrix__sticky-col harvest-matrix__sticky-col--shifts" style={{ textAlign: 'center' }}>
                    -
                </td>
                <td className="harvest-matrix__sticky-col harvest-matrix__sticky-col--kg-turno" style={{ textAlign: 'center' }}>
                    -
                </td>
                {tableTotals.dailyKgPerShift.map((kgPerShift, dayIndex) => (
                    <td key={`kg-jornal-${dayIndex}`} colSpan={3} style={{ padding: '8px', textAlign: 'center' }}>
                        {kgPerShift > 0 ? kgPerShift : '-'}
                    </td>
                ))}
                <td style={{ padding: '8px', textAlign: 'center' }}>-</td>
            </tr>
        </>
    );
};
