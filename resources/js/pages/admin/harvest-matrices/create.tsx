import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import PageTitle from '@/components/PageTitle';
import MainLayout from '@/layouts/MainLayout';
import { router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, FormLabel, Row } from 'react-bootstrap';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import Select from 'react-select';

const matrixSchema = yup.object({
    week_number: yup.number()
        .required('El número de semana es requerido')
        .min(1, 'La semana debe ser entre 1 y 53')
        .max(53, 'La semana debe ser entre 1 y 53'),
    year: yup.number()
        .required('El año es requerido')
        .min(2024, 'El año debe ser 2024 o posterior')
        .max(2100, 'El año debe ser menor a 2100'),
    user_id: yup.string().required('El responsable es requerido'),
});

type MatrixFormData = yup.InferType<typeof matrixSchema>;

const CreateHarvestMatrixPage = () => {
    const { users } = usePage<{
        users: Array<{ id: number; name: string }>;
    }>().props;
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Función para obtener el número de semana
    const getWeekNumber = (date: Date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart = new Date(d.getFullYear(), 0, 1);
        return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    };

    // Función para obtener el número máximo de semanas en un año
    const getMaxWeeksInYear = (year: number) => {
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        const jan1Day = new Date(year, 0, 1).getDay();
        if ((isLeapYear && jan1Day === 3) || (!isLeapYear && jan1Day === 4)) {
            return 53;
        } else {
            return 52;
        }
    };

    const yearOptions = [2024, 2025, 2026];

    const { handleSubmit, control } = useForm<MatrixFormData>({
        resolver: yupResolver(matrixSchema),
        defaultValues: {
            week_number: getWeekNumber(new Date()),
            year: new Date().getFullYear(),
            user_id: '',
        },
    });

    const watchedYear = useWatch({ control, name: 'year' });
    const maxWeeks = getMaxWeeksInYear(watchedYear || currentYear);
    const weekOptions = Array.from({ length: maxWeeks }, (_, i) => i + 1);

    const yearSelectOptions = yearOptions.map(year => ({ value: year, label: year.toString() }));
    const weekSelectOptions = weekOptions.map(week => ({ value: week, label: `Semana ${week}` }));
    const userSelectOptions = users.map(user => ({ value: user.id.toString(), label: user.name }));

    const onSubmit = (data: MatrixFormData) => {
        setIsSubmitting(true);
        router.post(route('admin.harvest-matrices.store'), data, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <>
            <PageTitle title="Crear Matriz de Cosecha" subTitle="Matrices de Cosecha" />
            <ComponentContainerCard title="Selecciona semana y responsable">
                <Row>
                    <Col xs={12}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg={4}>
                                    <div className="mb-3">
                                        <FormLabel>Año</FormLabel>
                                        <Controller
                                            name="year"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <Select
                                                        value={yearSelectOptions.find((option) => option.value === field.value) || null}
                                                        onChange={(option) => field.onChange(option?.value || null)}
                                                        options={yearSelectOptions}
                                                        placeholder="Seleccione un año"
                                                        classNamePrefix="react-select"
                                                        styles={{
                                                            control: (provided, state) => ({
                                                                ...provided,
                                                                borderColor: fieldState.error ? '#dc3545' : provided.borderColor,
                                                                '&:hover': {
                                                                    borderColor: fieldState.error ? '#dc3545' : provided.borderColor
                                                                }
                                                            })
                                                        }}
                                                    />
                                                    {fieldState.error && (
                                                        <div className="invalid-feedback d-block">
                                                            {fieldState.error.message}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className="mb-3">
                                        <FormLabel>Número de Semana</FormLabel>
                                        <Controller
                                            name="week_number"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <Select
                                                        value={weekSelectOptions.find((option) => option.value === field.value) || null}
                                                        onChange={(option) => field.onChange(option?.value || null)}
                                                        options={weekSelectOptions}
                                                        placeholder="Seleccione una semana"
                                                        classNamePrefix="react-select"
                                                        styles={{
                                                            control: (provided, state) => ({
                                                                ...provided,
                                                                borderColor: fieldState.error ? '#dc3545' : provided.borderColor,
                                                                '&:hover': {
                                                                    borderColor: fieldState.error ? '#dc3545' : provided.borderColor
                                                                }
                                                            })
                                                        }}
                                                    />
                                                    {fieldState.error && (
                                                        <div className="invalid-feedback d-block">
                                                            {fieldState.error.message}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className="mb-3">
                                        <FormLabel>Responsable</FormLabel>
                                        <Controller
                                            name="user_id"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <Select
                                                        value={userSelectOptions.find((option) => option.value === field.value) || null}
                                                        onChange={(option) => field.onChange(option?.value || null)}
                                                        options={userSelectOptions}
                                                        placeholder="Seleccione un responsable"
                                                        classNamePrefix="react-select"
                                                        styles={{
                                                            control: (provided, state) => ({
                                                                ...provided,
                                                                borderColor: fieldState.error ? '#dc3545' : provided.borderColor,
                                                                '&:hover': {
                                                                    borderColor: fieldState.error ? '#dc3545' : provided.borderColor
                                                                }
                                                            })
                                                        }}
                                                    />
                                                    {fieldState.error && (
                                                        <div className="invalid-feedback d-block">
                                                            {fieldState.error.message}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-end gap-2">
                                <Link href={route('admin.harvest-matrices.index')} className="btn btn-light">
                                    Cancelar
                                </Link>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Creando...' : 'Crear Matriz'}
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
