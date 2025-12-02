import React from 'react';

interface DateInfo {
    day_of_week: number;
    date: string;
    day_name: string;
}

interface MatrixTableHeaderProps {
    defaultDates: DateInfo[];
}

export const MatrixTableHeader: React.FC<MatrixTableHeaderProps> = ({ defaultDates }) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}`;
    };

    return (
        <thead>
            <tr>
                <th rowSpan={3} className="harvest-matrix__sticky-col harvest-matrix__sticky-col--variety">Variedad</th>
                <th rowSpan={3} className="harvest-matrix__sticky-col harvest-matrix__sticky-col--shift">Turno</th>
                <th rowSpan={3} className="harvest-matrix__sticky-col harvest-matrix__sticky-col--lots">Lotes</th>
                <th rowSpan={3} className="harvest-matrix__sticky-col harvest-matrix__sticky-col--lines">Líneas</th>
                <th rowSpan={3} className="harvest-matrix__sticky-col harvest-matrix__sticky-col--kilos">Kilos</th>
                <th rowSpan={3} className="harvest-matrix__sticky-col harvest-matrix__sticky-col--kg-avg">Kg/Jor Prom</th>
                <th rowSpan={3} className="harvest-matrix__sticky-col harvest-matrix__sticky-col--shifts">Jornales</th>
                <th rowSpan={3} className="harvest-matrix__sticky-col harvest-matrix__sticky-col--kg-turno">Kg x Turno</th>
                {defaultDates.map((dateInfo, index) => (
                    <th key={index} colSpan={3} className="harvest-matrix__header--day">
                        {dateInfo.day_name.charAt(0).toUpperCase() + dateInfo.day_name.slice(1).toLowerCase()}
                    </th>
                ))}
                <th rowSpan={3} style={{ minWidth: '100px', verticalAlign: 'middle' }}>Acciones</th>
            </tr>
            <tr>
                {defaultDates.map((dateInfo, index) => (
                    <th key={index} colSpan={3} className="harvest-matrix__header--date">
                        {formatDate(dateInfo.date)}
                    </th>
                ))}
            </tr>
            <tr>
                {defaultDates.map((dateInfo, index) => (
                    <React.Fragment key={index}>
                        <th className="harvest-matrix__header--label">Frec.</th>
                        <th className="harvest-matrix__header--label">Kg / dia</th>
                        <th className="harvest-matrix__header--label">Jornal</th>
                    </React.Fragment>
                ))}
            </tr>
        </thead>
    );
};
