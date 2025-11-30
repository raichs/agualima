import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { Badge, Col, Row } from 'react-bootstrap';

interface ShowUserPageProps {
    user: User;
}

const ShowUserPage = ({ user }: ShowUserPageProps) => {
    return (
        <>
            <PageTitle title="Detalles del Usuario" subTitle="Usuarios" />
            <Row className="mb-3">
                <Col className="text-end">
                    <Link href={route('admin.users.index')} className="btn btn-secondary btn-sm">
                        <IconifyIcon icon="tabler:arrow-left" className="me-1" /> Volver
                    </Link>
                </Col>
            </Row>
            <ComponentContainerCard title="Información del usuario">
                <Row>
                    <Col lg={4}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Nombre Completo</label>
                            <p className="form-control-plaintext">{user.name}</p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Email</label>
                            <p className="form-control-plaintext">{user.email}</p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Rol</label>
                            <p className="form-control-plaintext">
                                <Badge bg="primary">{user.role_name || 'Sin rol'}</Badge>
                            </p>
                        </div>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

ShowUserPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default ShowUserPage;
