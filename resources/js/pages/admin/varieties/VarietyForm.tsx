import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import PageTitle from '@/components/PageTitle';
import MainLayout from '@/layouts/MainLayout';
import { Variety } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, FormLabel, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import Select from 'react-select';

const varietySchema = yup.object({
    name: yup.string().required('El nombre de la variedad es requerido'),
    nursery_id: yup.number().required('El vivero es requerido'),
});

type VarietyFormData = yup.InferType<typeof varietySchema>;

interface Nursery {
    id: number;
    name: string;
}

interface VarietyFormProps {
    variety?: Variety;
    title: string;
    subTitle: string;
    cardTitle: string;
}

const VarietyForm = ({ variety, title, subTitle, cardTitle }: VarietyFormProps) => {
    const { nurseries } = usePage<{ nurseries: Nursery[] }>().props;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { handleSubmit, control } = useForm<VarietyFormData>({
        resolver: yupResolver(varietySchema),
        defaultValues: {
            name: variety?.name || '',
            nursery_id: variety?.nursery_id || undefined,
        },
    });

    const nurseryOptions = nurseries.map((nursery) => ({
        value: nursery.id,
        label: nursery.name,
    }));

    const selectStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            borderColor: state.selectProps.error ? '#dc3545' : provided.borderColor,
            '&:hover': {
                borderColor: state.selectProps.error ? '#dc3545' : provided.borderColor
            }
        })
    };

    const onSubmit = (data: VarietyFormData) => {
        setIsSubmitting(true);
        if (variety) {
            router.put(route('admin.varieties.update', variety.id), data, {
                onFinish: () => setIsSubmitting(false),
            });
        } else {
            router.post(route('admin.varieties.store'), data, {
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
                                <Col lg={6}>
                                    <div className="mb-3">
                                        <FormLabel>Vivero</FormLabel>
                                        <Controller
                                            name="nursery_id"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <Select
                                                        {...field}
                                                        value={nurseryOptions.find((option) => option.value === field.value) || null}
                                                        onChange={(option) => field.onChange(option?.value || null)}
                                                        options={nurseryOptions}
                                                        placeholder="Seleccione un vivero"
                                                        classNamePrefix="react-select"
                                                        styles={selectStyles}
                                                        error={!!fieldState.error}
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
                                <Link href={route('admin.varieties.index')} className="btn btn-light">
                                    Cancelar
                                </Link>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? (variety ? 'Actualizando...' : 'Guardando...') : (variety ? 'Actualizar' : 'Guardar')}
                                </Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

export default VarietyForm;