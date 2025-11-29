import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination/Pagination';
import Table from '@/components/Table/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { PaginatedData, Role } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Card, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';

const RolesPage = () => {
    const { roles } = usePage<{
        roles: PaginatedData<Role>;
    }>().props;

    const { data, meta } = roles;
    const links = meta?.links || [];

    return (
        <>
            <PageTitle title="Roles" subTitle="Administración" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between border-bottom border-light">
                            <h4 className="header-title">Lista de Roles</h4>
                            <div>
                                <Link href={route('admin.roles.create')} className="btn btn-primary">
                                    <IconifyIcon icon="tabler:plus" className="me-1" /> Nuevo Rol
                                </Link>
                            </div>
                        </CardHeader>
                        <Table
                            columns={[
                                { label: 'Nombre', name: 'label' },
                            ]}
                            rows={data}
                            showRoute="admin.roles.show"
                            editRoute="admin.roles.edit"
                            deleteRoute="admin.roles.destroy"
                            deleteOptions={{
                                title: '¿Eliminar rol?',
                                text: 'Esta acción no se puede deshacer',
                                confirmButtonText: 'Sí, eliminar',
                                cancelButtonText: 'Cancelar',
                                successTitle: '¡Eliminado!',
                                successText: 'El rol ha sido eliminado exitosamente'
                            }}
                            emptyMessage="No hay roles registrados"
                        />
                        <CardFooter>
                            <Pagination links={links} />
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

RolesPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default RolesPage;
