import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { Distribution } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Badge, Col, Row } from 'react-bootstrap';

const ShowDistributionPage = () => {
    const { distribution } = usePage<{ distribution: Distribution }>().props;

    return (
        <>
            <PageTitle title="Detalle de Distribución" subTitle="Distribuciones" />
            <Row className="mb-3">
                <Col className="text-end">
                    <Link href={route('admin.distributions.edit', distribution.id)} className="btn btn-primary btn-sm me-2">
                        <IconifyIcon icon="tabler:edit" className="me-1" /> Editar
                    </Link>
                    <Link href={route('admin.distributions.index')} className="btn btn-secondary btn-sm">
                        <IconifyIcon icon="tabler:arrow-left" className="me-1" /> Volver
                    </Link>
                </Col>
            </Row>
            <ComponentContainerCard title="Información de la Distribución">
                <Row>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Proyecto</label>
                            <p className="form-control-plaintext">
                                <Badge bg="primary">{distribution.project_name}</Badge>
                            </p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Variedad</label>
                            <p className="form-control-plaintext">
                                <Badge bg="success">{distribution.variety_name}</Badge>
                            </p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Turno</label>
                            <p className="form-control-plaintext">
                                <Badge bg="warning" text="dark">{distribution.shift_name}</Badge>
                            </p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Lote</label>
                            <p className="form-control-plaintext">
                                <Badge bg="info">{distribution.lot_code} - {distribution.lot_name}</Badge>
                            </p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Fecha de Creación</label>
                            <p className="form-control-plaintext">
                                {distribution.created_at ? new Date(distribution.created_at).toLocaleString('es-ES') : '-'}
                            </p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Última Actualización</label>
                            <p className="form-control-plaintext">
                                {distribution.updated_at ? new Date(distribution.updated_at).toLocaleString('es-ES') : '-'}
                            </p>
                        </div>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

ShowDistributionPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default ShowDistributionPage;
