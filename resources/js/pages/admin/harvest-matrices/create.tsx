import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import PageTitle from '@/components/PageTitle';
import MainLayout from '@/layouts/MainLayout';
import { router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

const matrixSchema = yup.object({
    name: yup.string().required('El nombre es requerido'),
    week_number: yup.number()
        .required('El número de semana es requerido')
        .min(1, 'La semana debe ser entre 1 y 53')
        .max(53, 'La semana debe ser entre 1 y 53'),
    year: yup.number()
        .required('El año es requerido')
        .min(2020, 'El año debe ser mayor a 2020')
        .max(2100, 'El año debe ser menor a 2100'),
    start_date: yup.date().required('La fecha de inicio es requerida'),
    end_date: yup.date()
        .required('La fecha de fin es requerida')
        .min(yup.ref('start_date'), 'La fecha de fin debe ser posterior a la de inicio'),
    kg_target: yup.number().nullable().min(0, 'Los kg deben ser positivos'),
    total_staff: yup.number().nullable().min(0, 'El personal debe ser positivo'),
    notes: yup.string().default(''),
});

type MatrixFormData = yup.InferType<typeof matrixSchema>;

const CreateHarvestMatrixPage = () => {
    const { suggestedWeek, suggestedYear, suggestedStartDate, suggestedEndDate } = usePage<{
        suggestedWeek: number;
        suggestedYear: number;
        suggestedStartDate: string;
        suggestedEndDate: string;
    }>().props;
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { handleSubmit, control } = useForm<MatrixFormData>({
        resolver: yupResolver(matrixSchema),
        defaultValues: {
            name: `Matriz Semana ${suggestedWeek} - ${suggestedYear}`,
            week_number: suggestedWeek,
            year: suggestedYear,
            start_date: suggestedStartDate as any,
            end_date: suggestedEndDate as any,
            kg_target: undefined,
            total_staff: undefined,
            notes: '',
        },
    });

    const onSubmit = (data: MatrixFormData) => {
        setIsSubmitting(true);
        router.post(route('admin.harvest-matrices.store'), data, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <>
            <PageTitle title="Crear Matriz de Cosecha" subTitle="Matrices de Cosecha" />
            <ComponentContainerCard title="Ingresa la información de la matriz">
                <Row>
                    <Col xs={12}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg={12}>
                                    <TextFormInput
                                        control={control}
                                        name="name"
                                        label="Nombre de la Matriz"
                                        placeholder="Ej: Matriz Semana 48 - 2025"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={4}>
                                    <TextFormInput
                                        control={control}
                                        name="week_number"
                                        label="Número de Semana"
                                        type="number"
                                        placeholder="1-53"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={4}>
                                    <TextFormInput
                                        control={control}
                                        name="year"
                                        label="Año"
                                        type="number"
                                        placeholder="2025"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={4}>
                                    <TextFormInput
                                        control={control}
                                        name="kg_target"
                                        label="Kg Objetivo Semanal"
                                        type="number"
                                        step="0.01"
                                        placeholder="Ej: 50000"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="start_date"
                                        label="Fecha de Inicio (Lunes)"
                                        type="date"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="end_date"
                                        label="Fecha de Fin (Domingo)"
                                        type="date"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={12}>
                                    <TextFormInput
                                        control={control}
                                        name="total_staff"
                                        label="Personal Total Disponible"
                                        type="number"
                                        placeholder="Ej: 150"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={12}>
                                    <TextAreaFormInput
                                        control={control}
                                        name="notes"
                                        label="Observaciones"
                                        placeholder="Notas adicionales sobre la matriz"
                                        rows={3}
                                        containerClassName="mb-3"
                                    />
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-end gap-2">
                                <Link href={route('admin.harvest-matrices.index')} className="btn btn-light">
                                    Cancelar
                                </Link>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Guardando...' : 'Guardar Matriz'}
                                </Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

CreateHarvestMatrixPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default CreateHarvestMatrixPage;
