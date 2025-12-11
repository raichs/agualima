import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import PageTitle from '@/components/PageTitle';
import { Campaign } from '@/types';
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import Select from 'react-select';
import { usePage } from '@inertiajs/react';

const campaignSchema = yup.object({
    name: yup.string().required('El nombre de la campaña es requerido'),
    start_date: yup.string().required('La fecha de inicio es requerida').transform((value, originalValue) => {
        if (originalValue === '' || originalValue === null || originalValue === undefined) {
            return undefined;
        }
        return value;
    }),
    end_date: yup.string().nullable().transform((value, originalValue) => originalValue === '' ? null : value),
    actual_end_date: yup.string().nullable().transform((value, originalValue) => originalValue === '' ? null : value),
    pruning_period_start: yup.string().nullable().transform((value, originalValue) => originalValue === '' ? null : value),
    pruning_period_end: yup.string().nullable().transform((value, originalValue) => originalValue === '' ? null : value),
    status: yup.number().required('El estado es requerido').oneOf([1, 2, 3, 4, 5]),
    target_total_kg: yup.number().nullable().transform((value, originalValue) => originalValue === '' ? null : value).min(0, 'Debe ser mayor o igual a 0'),
    actual_total_kg: yup.number().nullable().transform((value, originalValue) => originalValue === '' ? null : value).min(0, 'Debe ser mayor o igual a 0'),
    climate_notes: yup.string().nullable().transform((value, originalValue) => originalValue === '' ? null : value),
    agronomic_notes: yup.string().nullable().transform((value, originalValue) => originalValue === '' ? null : value),
    closing_notes: yup.string().nullable().transform((value, originalValue) => originalValue === '' ? null : value),
});

type CampaignFormData = yup.InferType<typeof campaignSchema>;

interface CampaignFormProps {
    campaign?: Campaign;
    title: string;
    subTitle: string;
    cardTitle: string;
    statusOptions?: Array<{ value: number; label: string }>;
}

const CampaignForm = ({ campaign, title, subTitle, cardTitle, statusOptions }: CampaignFormProps) => {
    const { statusOptions: pageStatusOptions } = usePage<{
        statusOptions?: Array<{ value: number; label: string }>;
    }>().props;

    // Use statusOptions from props, or from page props, or fallback to empty array
    const availableStatusOptions = statusOptions || pageStatusOptions || [];
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { handleSubmit, control } = useForm<any>({
        resolver: yupResolver(campaignSchema),
        defaultValues: {
            name: campaign?.name || '',
            start_date: campaign?.start_date,
            end_date: campaign?.end_date,
            actual_end_date: campaign?.actual_end_date,
            pruning_period_start: campaign?.pruning_period_start,
            pruning_period_end: campaign?.pruning_period_end,
            status: campaign?.status || 1,
            target_total_kg: campaign?.target_total_kg ?? undefined,
            actual_total_kg: campaign?.actual_total_kg ?? undefined,
            climate_notes: campaign?.climate_notes ?? '',
            agronomic_notes: campaign?.agronomic_notes ?? '',
            closing_notes: campaign?.closing_notes ?? '',
        },
    });

    const selectStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            borderColor: state.selectProps.error ? '#dc3545' : provided.borderColor,
            '&:hover': {
                borderColor: state.selectProps.error ? '#dc3545' : provided.borderColor
            }
        })
    };

    const onSubmit = (data: any) => {
        setIsSubmitting(true);

        // Convert date strings back to Date objects for the backend
        const submitData = {
            ...data,
            start_date: data.start_date ? new Date(data.start_date) : null,
            end_date: data.end_date ? new Date(data.end_date) : null,
            actual_end_date: data.actual_end_date ? new Date(data.actual_end_date) : null,
            pruning_period_start: data.pruning_period_start ? new Date(data.pruning_period_start) : null,
            pruning_period_end: data.pruning_period_end ? new Date(data.pruning_period_end) : null,
        };

        if (campaign) {
            router.put(route('admin.campaigns.update', campaign.id), submitData, {
                onFinish: () => setIsSubmitting(false),
            });
        } else {
            router.post(route('admin.campaigns.store'), submitData, {
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
                                        label="Nombre de la Campaña"
                                        placeholder="Ej: Campaña 2024-2025"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <div className="mb-3">
                                        <label className="form-label">Estado</label>
                                        <Controller
                                            name="status"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <Select
                                                        {...field}
                                                        value={availableStatusOptions.find((option) => option.value === field.value) || null}
                                                        onChange={(option: { value: number; label: string } | null) => field.onChange(option?.value || null)}
                                                        options={availableStatusOptions}
                                                        placeholder="Seleccione un estado"
                                                        classNamePrefix="react-select"
                                                        styles={selectStyles}
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
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="start_date"
                                        label="Fecha de Inicio"
                                        type="date"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="end_date"
                                        label="Fecha Fin Estimada"
                                        type="date"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="actual_end_date"
                                        label="Fecha Fin Real"
                                        type="date"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="pruning_period_start"
                                        label="Inicio Período de Poda"
                                        type="date"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="pruning_period_end"
                                        label="Fin Período de Poda"
                                        type="date"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="target_total_kg"
                                        label="Meta Total (kg)"
                                        type="number"
                                        step="0.001"
                                        placeholder="0.000"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="actual_total_kg"
                                        label="Producción Real (kg)"
                                        type="number"
                                        step="0.001"
                                        placeholder="0.000"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={12}>
                                    <TextAreaFormInput
                                        control={control}
                                        name="climate_notes"
                                        label="Notas sobre Clima"
                                        placeholder="Observaciones sobre el clima de la campaña"
                                        containerClassName="mb-3"
                                        rows={3}
                                    />
                                </Col>
                                <Col lg={12}>
                                    <TextAreaFormInput
                                        control={control}
                                        name="agronomic_notes"
                                        label="Notas Agronómicas"
                                        placeholder="Observaciones agronómicas generales"
                                        containerClassName="mb-3"
                                        rows={3}
                                    />
                                </Col>
                                <Col lg={12}>
                                    <TextAreaFormInput
                                        control={control}
                                        name="closing_notes"
                                        label="Observaciones al Cerrar"
                                        placeholder="Observaciones al cerrar la campaña"
                                        containerClassName="mb-3"
                                        rows={3}
                                    />
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-end gap-2">
                                <Link href={route('admin.campaigns.index')} className="btn btn-light">
                                    Cancelar
                                </Link>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? (campaign ? 'Actualizando...' : 'Guardando...') : (campaign ? 'Actualizar' : 'Guardar')}
                                </Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

export default CampaignForm;