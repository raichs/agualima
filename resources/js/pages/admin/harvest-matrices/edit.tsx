import React, { useState } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { router, Link } from '@inertiajs/react';
import { Button, Col, Row, Table } from 'react-bootstrap';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import MainLayout from '@/layouts/MainLayout';
import { HarvestMatrix, Variety, Shift, Lot } from '@/types';

import { matrixSchema, MatrixFormData } from './schemas/matrixSchema';
import { useMatrixCalculations } from './hooks/useMatrixCalculations';
import { MatrixTableHeader } from './components/MatrixTableHeader';
import { RowComponent } from './components/RowComponent';
import { TotalRows } from './components/TotalRows';

interface EditHarvestMatrixPageProps {
    matrix: HarvestMatrix;
    varieties: Variety[];
    shifts: Shift[];
    lots: Lot[];
}

const DEFAULT_DATES = [
    { day_of_week: 1, date: '', day_name: 'Lunes' },
    { day_of_week: 2, date: '', day_name: 'Martes' },
    { day_of_week: 3, date: '', day_name: 'Miércoles' },
    { day_of_week: 4, date: '', day_name: 'Jueves' },
    { day_of_week: 5, date: '', day_name: 'Viernes' },
    { day_of_week: 6, date: '', day_name: 'Sábado' },
];

const createDefaultLot = (dates: any[]) => ({
    lot_id: '',
    lines: 1,
    total_kilos: 0,
    kg_per_shift_avg: 0,
    total_shifts: 0,
    daily_data: dates.map(date => ({
        day_of_week: date.day_of_week,
        date: date.date,
        frequency: 0,
        kg_per_day: 0,
        shifts: 0,
    }))
});

const EditHarvestMatrixPage: React.FC<EditHarvestMatrixPageProps> = ({
    matrix,
    varieties,
    shifts,
    lots
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const defaultDates = matrix.dates || DEFAULT_DATES;

    const { handleSubmit, control } = useForm<MatrixFormData>({
        resolver: yupResolver(matrixSchema),
        defaultValues: {
            rows: matrix.rows?.map(row => ({
                id: row.id,
                variety_id: row.variety_id?.toString() || '',
                shift_id: row.shift_id?.toString() || '',
                lots: row.lots?.map(lot => ({
                    lot_id: lot.lot_id?.toString() || '',
                    lines: lot.lines || 1,
                    total_kilos: lot.total_kilos || 0,
                    kg_per_shift_avg: lot.kg_per_shift_avg || 0,
                    total_shifts: lot.total_shifts || 0,
                    daily_data: lot.daily_data?.map(data => ({
                        day_of_week: data.day_of_week,
                        date: data.date || '',
                        frequency: data.frequency || 0,
                        kg_per_day: data.kg_per_day || 0,
                        shifts: data.shifts || 0,
                    })) || defaultDates.map(date => ({
                        day_of_week: date.day_of_week,
                        date: date.date,
                        frequency: 0,
                        kg_per_day: 0,
                        shifts: 0,
                    })),
                })) || [createDefaultLot(defaultDates)],
            })) || [],
        },
    });

    const { fields: rowFields, append: appendRow, remove: removeRow } = useFieldArray({
        control,
        name: 'rows',
    });

    const watchedRows = useWatch({ control, name: 'rows' }) || [];
    const { rowTotals, tableTotals } = useMatrixCalculations(watchedRows, defaultDates);

    const onSubmit = (data: MatrixFormData) => {
        setIsSubmitting(true);
        router.put(route('admin.harvest-matrices.update', matrix.id), data, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    const addRow = () => {
        appendRow({
            variety_id: '',
            shift_id: '',
            lots: [createDefaultLot(defaultDates)],
        });
    };

    const dayNames = defaultDates.map(date => date.day_name);
    const varietyOptions = varieties.map(v => ({ value: v.id.toString(), label: v.name }));
    const shiftOptions = shifts.map(s => ({ value: s.id.toString(), label: s.name }));
    const lotOptions = lots.map(l => ({ value: l.id.toString(), label: l.code }));

    return (
        <>
            <PageTitle title={`Editar Matriz - Semana ${matrix.week_number} ${matrix.year}`} subTitle="Matrices de Cosecha" />
            <ComponentContainerCard title={`Matriz de ${matrix.user?.name}`}>
                <Row>
                    <Col xs={12}>
                        <div className="d-flex justify-content-between mb-3">
                            <h5>Filas de Producción</h5>
                            <Button onClick={addRow} variant="success" size="sm">
                                Agregar Fila
                            </Button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="harvest-matrix__table-container">
                                <Table bordered className="harvest-matrix__table">
                                    <MatrixTableHeader defaultDates={defaultDates} />
                                    <tbody>
                                        {rowFields.map((field, index) => (
                                            <RowComponent
                                                key={field.id}
                                                rowIndex={index}
                                                control={control}
                                                varietyOptions={varietyOptions}
                                                shiftOptions={shiftOptions}
                                                lotOptions={lotOptions}
                                                dayNames={dayNames}
                                                onRemove={() => removeRow(index)}
                                            />
                                        ))}
                                        <TotalRows tableTotals={tableTotals} />
                                    </tbody>
                                </Table>
                            </div>

                            <div className="d-flex justify-content-end gap-2 mt-3">
                                <Link href={route('admin.harvest-matrices.index')} className="btn btn-light">
                                    Cancelar
                                </Link>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                                </Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

(EditHarvestMatrixPage as any).layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default EditHarvestMatrixPage;
