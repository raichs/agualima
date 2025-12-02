import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import PageTitle from '@/components/PageTitle';
import MainLayout from '@/layouts/MainLayout';
import { router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, FormLabel, FormSelect, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

const matrixSchema = yup.object({
    week_number: yup.number()
        .required('El número de semana es requerido')
        .min(1, 'La semana debe ser entre 1 y 53')
        .max(53, 'La semana debe ser entre 1 y 53'),
    year: yup.number()
        .required('El año es requerido')
        .min(2020, 'El año debe ser mayor a 2020')
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
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    };

    const { handleSubmit, control } = useForm<MatrixFormData>({
        resolver: yupResolver(matrixSchema),
        defaultValues: {
            week_number: getWeekNumber(new Date()),
            year: new Date().getFullYear(),
            user_id: '',
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
            <ComponentContainerCard title="Selecciona semana y responsable">
                <Row>
                    <Col xs={12}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
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
                                    <div className="mb-3">
                                        <FormLabel>Responsable</FormLabel>
                                        <Controller
                                            name="user_id"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <FormSelect
                                                        {...field}
                                                        isInvalid={!!fieldState.error}
                                                    >
                                                        <option value="">Seleccione un responsable</option>
                                                        {users.map((user) => (
                                                            <option key={user.id} value={user.id.toString()}>
                                                                {user.name}
                                                            </option>
                                                        ))}
                                                    </FormSelect>
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
