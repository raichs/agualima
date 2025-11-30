import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { Role } from '@/types';
import { Link } from '@inertiajs/react';
import { Col, Row } from 'react-bootstrap';

interface ShowRolePageProps {
    role: Role;
}

const ShowRolePage = ({ role }: ShowRolePageProps) => {
    return (
        <>
            <PageTitle title="Detalles del Rol" subTitle="Roles" />
            <Row className="mb-3">
                <Col className="text-end">
                    <Link href={route('admin.roles.index')} className="btn btn-secondary btn-sm">
                        <IconifyIcon icon="tabler:arrow-left" className="me-1" /> Volver
                    </Link>
                </Col>
            </Row>
            <ComponentContainerCard title="Información del rol">
                <Row>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Nombre del Rol</label>
                            <p className="form-control-plaintext">{role.label || role.name}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Identificador (Key)</label>
                            <p className="form-control-plaintext"><code>{role.name}</code></p>
                        </div>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

ShowRolePage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default ShowRolePage;
