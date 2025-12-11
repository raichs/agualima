import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination/Pagination';
import Table from '@/components/Table/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { PaginatedData, Role } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Card, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';

const RolesPage = () => {
    const { roles, total } = usePage<{
        roles: PaginatedData<Role>;
        total: number;
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
                            <div className="d-flex align-items-start gap-2 flex-column">
                                <h4 className="header-title mb-0">Lista de Roles <span className="badge bg-primary ms-1 p-1">{total}</span></h4>
                            </div>
                            <div>
                                <Link href={route('admin.roles.create')} className="btn btn-primary">
                                    <IconifyIcon icon="tabler:plus" className="me-1" /> Nuevo Rol
                                </Link>
                            </div>
                        </CardHeader>
                        <Table
                            columns={[
                                { label: 'Nombre', name: 'display_name' },
                                { label: 'Descripción', name: 'description' },
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
                            <Pagination links={links} currentItems={data.length} totalItems={total} />
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

RolesPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default RolesPage;
