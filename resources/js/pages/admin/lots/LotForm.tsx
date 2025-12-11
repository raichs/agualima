import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import PageTitle from '@/components/PageTitle';
import { Lot } from '@/types';
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

const lotSchema = yup.object({
    code: yup.string().required('El código del lote es requerido'),
    name: yup.string().required('El nombre del lote es requerido'),
    description: yup.string().default(''),
    lines: yup.number().nullable().transform((value, originalValue) => originalValue === '' ? null : value).min(1, 'Debe tener al menos 1 línea'),
});

type LotFormData = yup.InferType<typeof lotSchema>;

interface LotFormProps {
    lot?: Lot;
    title: string;
    subTitle: string;
    cardTitle: string;
}

const LotForm = ({ lot, title, subTitle, cardTitle }: LotFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { handleSubmit, control } = useForm<any>({
        resolver: yupResolver(lotSchema),
        defaultValues: {
            code: lot?.code || '',
            name: lot?.name || '',
            description: lot?.description || '',
            lines: lot?.lines,
        },
    });

    const onSubmit = (data: LotFormData) => {
        setIsSubmitting(true);
        if (lot) {
            router.put(route('admin.lots.update', lot.id), data, {
                onFinish: () => setIsSubmitting(false),
            });
        } else {
            router.post(route('admin.lots.store'), data, {
                onFinish: () => setIsSubmitting(false),
            });
        }
    };

    return (
        <>
            <PageTitle title={title} subTitle={subTitle} />
            <ComponentContainerCard title={cardTitle}>
                <Row>
                    <Col xs={12}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="code"
                                        label="Código del Lote"
                                        placeholder="Ingrese el código (ej: A-21)"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="name"
                                        label="Nombre del Lote"
                                        placeholder="Ingrese el nombre"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="lines"
                                        label="Número de Líneas"
                                        placeholder="Ingrese el número de líneas"
                                        type="number"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={12}>
                                    <TextAreaFormInput
                                        control={control}
                                        name="description"
                                        label="Descripción"
                                        placeholder="Ingrese una descripción (opcional)"
                                        containerClassName="mb-3"
                                        rows={3}
                                    />
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-end gap-2">
                                <Link href={route('admin.lots.index')} className="btn btn-light">
                                    Cancelar
                                </Link>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? (lot ? 'Actualizando...' : 'Guardando...') : (lot ? 'Actualizar' : 'Guardar')}
                                </Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

export default LotForm;
