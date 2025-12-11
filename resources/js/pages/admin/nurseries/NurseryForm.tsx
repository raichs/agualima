import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import PageTitle from '@/components/PageTitle';
import { Country, Nursery } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, FormLabel, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import Select from 'react-select';

type NurseryFormData = {
    name: string;
    description: string;
    country_id: number;
};

interface NurseryFormProps {
    nursery?: Nursery;
    title: string;
    subTitle: string;
    cardTitle: string;
}

const NurseryForm = ({ nursery, title, subTitle, cardTitle }: NurseryFormProps) => {
    const { countries, errors } = usePage<{ countries: Country[]; errors: Record<string, string> }>().props;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const countryOptions = countries.map(c => ({ value: c.id, label: c.name }));

    const nurserySchema = yup.object({
        name: yup.string().required('El nombre del vivero es requerido'),
        description: yup.string().default(''),
        country_id: yup.number().required('El país es requerido'),
    });

    const { handleSubmit, control, setError, clearErrors } = useForm<NurseryFormData>({
        resolver: yupResolver(nurserySchema),
        defaultValues: {
            name: nursery?.name || '',
            description: nursery?.description || '',
            country_id: nursery?.country_id || undefined,
        },
    });

    // Set server errors to form
    useEffect(() => {
        if (errors) {
            Object.keys(errors).forEach((field) => {
                setError(field as keyof NurseryFormData, {
                    type: 'server',
                    message: errors[field],
                });
            });
        }
    }, [errors, setError]);

    // Clear server errors when user starts typing
    const handleFieldChange = (fieldName: keyof NurseryFormData) => {
        if (errors && errors[fieldName]) {
            clearErrors(fieldName);
        }
    };

    const selectStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            borderColor: state.selectProps.error ? '#dc3545' : provided.borderColor,
            '&:hover': {
                borderColor: state.selectProps.error ? '#dc3545' : provided.borderColor
            }
        })
    };

    const onSubmit = (data: NurseryFormData) => {
        setIsSubmitting(true);
        if (nursery) {
            router.put(route('admin.nurseries.update', nursery.id), data, {
                onFinish: () => setIsSubmitting(false),
            });
        } else {
            router.post(route('admin.nurseries.store'), data, {
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
                                        name="name"
                                        label="Nombre del Vivero"
                                        placeholder="Ingrese el nombre del vivero"
                                        containerClassName="mb-3"
                                        onChange={() => handleFieldChange('name')}
                                    />
                                </Col>
                                <Col lg={6}>
                                    <div className="mb-3">
                                        <FormLabel>País</FormLabel>
                                        <Controller
                                            name="country_id"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <Select
                                                        {...field}
                                                        value={countryOptions.find(o => o.value === field.value) || null}
                                                        onChange={(option) => field.onChange(option?.value || null)}
                                                        options={countryOptions}
                                                        placeholder="Seleccione un país"
                                                        classNamePrefix="react-select"
                                                        styles={selectStyles}
                                                        error={!!fieldState.error}
                                                        onBlur={() => handleFieldChange('country_id')}
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
                                <Col lg={12}>
                                    <div className="mb-3">
                                        <FormLabel>Descripción</FormLabel>
                                        <Controller
                                            name="description"
                                            control={control}
                                            render={({ field }) => (
                                                <textarea
                                                    {...field}
                                                    className="form-control"
                                                    rows={4}
                                                    placeholder="Ingrese una descripción del vivero"
                                                />
                                            )}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-end gap-2">
                                <Link href={route('admin.nurseries.index')} className="btn btn-light">
                                    Cancelar
                                </Link>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? (nursery ? 'Actualizando...' : 'Guardando...') : (nursery ? 'Actualizar' : 'Guardar')}
                                </Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

export default NurseryForm;
