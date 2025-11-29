import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import MainLayout from '@/layouts/MainLayout';
import { Distribution, Project, Variety, Shift, Lot } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, FormLabel, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import Select from 'react-select';

const distributionSchema = yup.object({
    project_id: yup.number().required('El proyecto es requerido'),
    variety_id: yup.number().required('La variedad es requerida'),
    shift_id: yup.number().required('El turno es requerido'),
    lot_id: yup.number().required('El lote es requerido'),
});

type DistributionFormData = yup.InferType<typeof distributionSchema>;

const EditDistributionPage = () => {
    const { distribution, projects, varieties, shifts, lots } = usePage<{
        distribution: Distribution;
        projects: Project[];
        varieties: Variety[];
        shifts: Shift[];
        lots: Lot[];
    }>().props;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const projectOptions = projects.map(p => ({ value: p.id, label: p.name }));
    const varietyOptions = varieties.map(v => ({ value: v.id, label: v.name }));
    const shiftOptions = shifts.map(s => ({ value: s.id, label: s.name }));
    const lotOptions = lots.map(l => ({ value: l.id, label: l.code }));

    const { handleSubmit, control } = useForm<DistributionFormData>({
        resolver: yupResolver(distributionSchema),
        defaultValues: {
            project_id: distribution.project_id || undefined,
            variety_id: distribution.variety_id || undefined,
            shift_id: distribution.shift_id || undefined,
            lot_id: distribution.lot_id || undefined,
        },
    });

    const onSubmit = (data: DistributionFormData) => {
        setIsSubmitting(true);
        router.put(route('admin.distributions.update', distribution.id), data, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <>
            <PageTitle title="Editar Distribución" subTitle="Distribuciones" />
            <ComponentContainerCard title="Actualiza la información de la distribución">
                <Row>
                    <Col xs={12}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg={6}>
                                    <div className="mb-3">
                                        <FormLabel>Proyecto</FormLabel>
                                        <Controller
                                            name="project_id"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <Select
                                                        className="select2"
                                                        options={projectOptions}
                                                        isMulti={false}
                                                        value={projectOptions.find(o => o.value === field.value) || null}
                                                        onChange={(option) => field.onChange(option?.value)}
                                                        placeholder="Seleccione un proyecto"
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
                                    <div className="mb-3">
                                        <FormLabel>Variedad</FormLabel>
                                        <Controller
                                            name="variety_id"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <Select
                                                        className="select2"
                                                        options={varietyOptions}
                                                        isMulti={false}
                                                        value={varietyOptions.find(o => o.value === field.value) || null}
                                                        onChange={(option) => field.onChange(option?.value)}
                                                        placeholder="Seleccione una variedad"
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
                                    <div className="mb-3">
                                        <FormLabel>Turno</FormLabel>
                                        <Controller
                                            name="shift_id"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <Select
                                                        className="select2"
                                                        options={shiftOptions}
                                                        isMulti={false}
                                                        value={shiftOptions.find(o => o.value === field.value) || null}
                                                        onChange={(option) => field.onChange(option?.value)}
                                                        placeholder="Seleccione un turno"
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
                                    <div className="mb-3">
                                        <FormLabel>Lote</FormLabel>
                                        <Controller
                                            name="lot_id"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <Select
                                                        className="select2"
                                                        options={lotOptions}
                                                        isMulti={false}
                                                        value={lotOptions.find(o => o.value === field.value) || null}
                                                        onChange={(option) => field.onChange(option?.value)}
                                                        placeholder="Seleccione un lote"
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
                                <Link href={route('admin.distributions.index')} className="btn btn-light">
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

EditDistributionPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default EditDistributionPage;
