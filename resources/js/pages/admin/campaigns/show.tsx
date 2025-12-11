import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { Campaign } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Col, Row } from 'react-bootstrap';

const ShowCampaignPage = () => {
    const { campaign, statusOptions } = usePage<{ 
        campaign: Campaign;
        statusOptions: Record<number, string>;
    }>().props;

    // Use statusOptions from backend, fallback to hardcoded ones
    const availableStatusLabels = statusOptions;

    return (
        <>
            <PageTitle title="Detalle de Campaña" subTitle="Campañas" />
            <Row className="mb-3">
                <Col className="text-end">
                    <Link href={route('admin.campaigns.edit', campaign.id)} className="btn btn-primary btn-sm me-2">
                        <IconifyIcon icon="tabler:edit" className="me-1" /> Editar
                    </Link>
                    <Link href={route('admin.campaigns.index')} className="btn btn-secondary btn-sm">
                        <IconifyIcon icon="tabler:arrow-left" className="me-1" /> Volver
                    </Link>
                </Col>
            </Row>
            <ComponentContainerCard title={`Campaña: ${campaign.name}`}>
                <Row>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Nombre</label>
                            <p className="form-control-plaintext">{campaign.name}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Estado</label>
                            <p className="form-control-plaintext">{availableStatusLabels[campaign.status] || 'Desconocido'}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Fecha de Inicio</label>
                            <p className="form-control-plaintext">{campaign.start_date}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Fecha Fin Estimada</label>
                            <p className="form-control-plaintext">{campaign.end_date || '-'}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Fecha Fin Real</label>
                            <p className="form-control-plaintext">{campaign.actual_end_date || '-'}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Inicio Período de Poda</label>
                            <p className="form-control-plaintext">{campaign.pruning_period_start || '-'}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Fin Período de Poda</label>
                            <p className="form-control-plaintext">{campaign.pruning_period_end || '-'}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Meta Total (kg)</label>
                            <p className="form-control-plaintext">{campaign.target_total_kg ? Number(campaign.target_total_kg).toFixed(3) : '-'}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Producción Real (kg)</label>
                            <p className="form-control-plaintext">{campaign.actual_total_kg ? Number(campaign.actual_total_kg).toFixed(3) : '-'}</p>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Notas sobre Clima</label>
                            <p className="form-control-plaintext">{campaign.climate_notes || '-'}</p>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Notas Agronómicas</label>
                            <p className="form-control-plaintext">{campaign.agronomic_notes || '-'}</p>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Observaciones al Cerrar</label>
                            <p className="form-control-plaintext">{campaign.closing_notes || '-'}</p>
                        </div>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

ShowCampaignPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default ShowCampaignPage;