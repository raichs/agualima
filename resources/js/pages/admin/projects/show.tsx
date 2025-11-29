import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { Link, router } from '@inertiajs/react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';

interface Project {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

interface ShowProjectPageProps {
    project: Project;
}

const ShowProjectPage = ({ project }: ShowProjectPageProps) => {
    return (
        <>
            <PageTitle title="Detalle del Proyecto" subTitle="Proyectos" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="border-bottom border-light">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4 className="header-title">Información del Proyecto</h4>
                                <div className="d-flex gap-2">
                                    <Link href={route('admin.projects.edit', project.id)} className="btn btn-success btn-sm">
                                        <IconifyIcon icon="tabler:edit" className="me-1" /> Editar
                                    </Link>
                                    <Link href={route('admin.projects.index')} className="btn btn-secondary btn-sm">
                                        <IconifyIcon icon="tabler:arrow-left" className="me-1" /> Volver
                                    </Link>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md={4}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">ID:</label>
                                        <p>{project.id}</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Nombre del Proyecto:</label>
                                        <p>{project.name}</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Descripción:</label>
                                        <p>{project.description || 'Sin descripción'}</p>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

ShowProjectPage.layout = (page: React.ReactNode) => (
  <MainLayout children={page} />
);

export default ShowProjectPage;
