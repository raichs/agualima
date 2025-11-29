import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import PageTitle from '@/components/PageTitle';
import MainLayout from '@/layouts/MainLayout';
import { Variety } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

const varietySchema = yup.object({
    name: yup.string().required('El nombre de la variedad es requerido'),
});

type VarietyFormData = yup.InferType<typeof varietySchema>;

const EditVarietyPage = () => {
    const { variety } = usePage<{ variety: Variety }>().props;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { handleSubmit, control } = useForm<VarietyFormData>({
        resolver: yupResolver(varietySchema),
        defaultValues: {
            name: variety.name || '',
        },
    });

    const onSubmit = (data: VarietyFormData) => {
        setIsSubmitting(true);
        router.put(route('admin.varieties.update', variety.id), data, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <>
            <PageTitle title="Editar Variedad" subTitle="Variedades" />
            <ComponentContainerCard title="Actualiza la información de la variedad">
                <Row>
                    <Col xs={12}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg={6}>
                                    <div className="mb-3">
                                        <TextFormInput
                                            control={control}
                                            name="name"
                                            label="Nombre de la Variedad"
                                            placeholder="Ingrese el nombre de la variedad"
                                            containerClassName="mb-3"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-end gap-2">
                                <Link href={route('admin.varieties.index')} className="btn btn-light">
                                    Cancelar
                                </Link>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Actualizando...' : 'Actualizar'}
                                </Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

EditVarietyPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default EditVarietyPage;
