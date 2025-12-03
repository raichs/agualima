import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { Nursery } from '@/types';
import { Link } from '@inertiajs/react';
import { Col, Row } from 'react-bootstrap';

interface ShowNurseryPageProps {
    nursery: Nursery;
}

const ShowNurseryPage = ({ nursery }: ShowNurseryPageProps) => {
    return (
        <>
            <PageTitle title="Detalles del Vivero" subTitle="Viveros" />
            <Row className="mb-3">
                <Col className="text-end">
                    <Link href={route('admin.nurseries.index')} className="btn btn-secondary btn-sm">
                        <IconifyIcon icon="tabler:arrow-left" className="me-1" /> Volver
                    </Link>
                </Col>
            </Row>
            <ComponentContainerCard title="Información del vivero">
                <Row>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Nombre del Vivero</label>
                            <p className="form-control-plaintext">{nursery.name}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">País</label>
                            <p className="form-control-plaintext">{nursery.country?.name || nursery.country_name}</p>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Descripción</label>
                            <p className="form-control-plaintext">{nursery.description || 'Sin descripción'}</p>
                        </div>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

ShowNurseryPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default ShowNurseryPage;
