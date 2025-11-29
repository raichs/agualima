import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import PageTitle from '@/components/PageTitle';
import MainLayout from '@/layouts/MainLayout';
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

const shiftSchema = yup.object({
    name: yup.string().required('El nombre del turno es requerido'),
});

type ShiftFormData = yup.InferType<typeof shiftSchema>;

const CreateShiftPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { handleSubmit, control } = useForm<ShiftFormData>({
        resolver: yupResolver(shiftSchema),
        defaultValues: {
            name: '',
        },
    });

    const onSubmit = (data: ShiftFormData) => {
        setIsSubmitting(true);
        router.post(route('admin.shifts.store'), data, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <>
            <PageTitle title="Crear Turno" subTitle="Turnos" />
            <ComponentContainerCard title="Ingresa la información del turno">
                <Row>
                    <Col xs={12}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg={6}>
                                    <div className="mb-3">
                                        <TextFormInput
                                            control={control}
                                            name="name"
                                            label="Nombre del Turno"
                                            placeholder="Ingrese el nombre del turno"
                                            containerClassName="mb-3"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-end gap-2">
                                <Link href={route('admin.shifts.index')} className="btn btn-light">
                                    Cancelar
                                </Link>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                                </Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

CreateShiftPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default CreateShiftPage;
