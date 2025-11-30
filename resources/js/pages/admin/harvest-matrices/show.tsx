import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { HarvestMatrix } from '@/types';
import { Link } from '@inertiajs/react';
import { Badge, Col, Row } from 'react-bootstrap';

interface ShowHarvestMatrixPageProps {
    matrix: HarvestMatrix;
}

const ShowHarvestMatrixPage = ({ matrix }: ShowHarvestMatrixPageProps) => {
    return (
        <>
            <PageTitle title="Detalles de la Matriz" subTitle="Matrices de Cosecha" />
            <Row className="mb-3">
                <Col className="text-end">
                    <Link href={route('admin.harvest-matrices.edit', matrix.id)} className="btn btn-warning btn-sm me-2">
                        <IconifyIcon icon="tabler:edit" className="me-1" /> Editar
                    </Link>
                    <Link href={route('admin.harvest-matrices.index')} className="btn btn-secondary btn-sm">
                        <IconifyIcon icon="tabler:arrow-left" className="me-1" /> Volver
                    </Link>
                </Col>
            </Row>
            <ComponentContainerCard title="Información de la matriz">
                <Row>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Nombre</label>
                            <p className="form-control-plaintext">{matrix.name}</p>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Semana</label>
                            <p className="form-control-plaintext">Semana {matrix.week_number}</p>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Año</label>
                            <p className="form-control-plaintext">{matrix.year}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Fecha de Inicio</label>
                            <p className="form-control-plaintext">
                                {new Date(matrix.start_date).toLocaleDateString('es-ES', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Fecha de Fin</label>
                            <p className="form-control-plaintext">
                                {new Date(matrix.end_date).toLocaleDateString('es-ES', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Estado</label>
                            <div>
                                <Badge bg={matrix.status_color}>{matrix.status_label}</Badge>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Kg Objetivo</label>
                            <p className="form-control-plaintext">
                                {matrix.kg_target ? `${matrix.kg_target.toLocaleString()} kg` : 'No definido'}
                            </p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Kg Ejecutados</label>
                            <p className="form-control-plaintext">{matrix.kg_executed.toLocaleString()} kg</p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Cumplimiento</label>
                            <p className="form-control-plaintext">
                                <Badge bg={matrix.completion_percentage >= 100 ? 'success' : matrix.completion_percentage >= 80 ? 'warning' : 'danger'}>
                                    {matrix.completion_percentage}%
                                </Badge>
                            </p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Personal Total</label>
                            <p className="form-control-plaintext">
                                {matrix.total_staff ? `${matrix.total_staff} personas` : 'No definido'}
                            </p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Alertas</label>
                            <div>
                                {matrix.has_active_alerts ? (
                                    <Badge bg="danger"><IconifyIcon icon="tabler:alert-triangle" /> Tiene alertas activas</Badge>
                                ) : (
                                    <Badge bg="success"><IconifyIcon icon="tabler:check" /> Sin alertas</Badge>
                                )}
                            </div>
                        </div>
                    </Col>
                    {matrix.notes && (
                        <Col lg={12}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Observaciones</label>
                                <p className="form-control-plaintext">{matrix.notes}</p>
                            </div>
                        </Col>
                    )}
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Creado por</label>
                            <p className="form-control-plaintext">{matrix.creator?.name || 'N/A'}</p>
                        </div>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

ShowHarvestMatrixPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default ShowHarvestMatrixPage;
