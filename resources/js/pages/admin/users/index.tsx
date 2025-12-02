import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination/Pagination';
import Table from '@/components/Table/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { PaginatedData, User } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Card, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';

const UsersPage = () => {
    const { users } = usePage<{
        users: PaginatedData<User>;
    }>().props;

    const { data, meta } = users;
    const links = meta?.links || [];

    return (
        <>
            <PageTitle title="Usuarios" subTitle="Administración" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between border-bottom border-light">
                            <h4 className="header-title">Lista de Usuarios</h4>
                            <div>
                                <Link href={route('admin.users.create')} className="btn btn-primary">
                                    <IconifyIcon icon="tabler:plus" className="me-1" /> Nuevo Usuario
                                </Link>
                            </div>
                        </CardHeader>
                        <Table
                            columns={[
                                { label: 'Nombre', name: 'name' },
                                { label: 'DNI', name: 'dni' },
                                { label: 'Email', name: 'email' },
                                { label: 'Rol', name: 'role_name' },
                            ]}
                            rows={data}
                            showRoute="admin.users.show"
                            editRoute="admin.users.edit"
                            deleteRoute="admin.users.destroy"
                            customActions={(user) => (
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => {
                                        if (confirm('¿Está seguro de restablecer la contraseña de este usuario? Se generará una nueva contraseña temporal.')) {
                                            router.post(route('admin.users.reset-password', user.id));
                                        }
                                    }}
                                    title="Restablecer contraseña"
                                >
                                    🔑 Reset
                                </button>
                            )}
                            deleteOptions={{
                                title: '¿Eliminar usuario?',
                                text: 'Esta acción no se puede deshacer',
                                confirmButtonText: 'Sí, eliminar',
                                cancelButtonText: 'Cancelar',
                                successTitle: '¡Eliminado!',
                                successText: 'El usuario ha sido eliminado exitosamente'
                            }}
                            emptyMessage="No hay usuarios registrados"
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

UsersPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default UsersPage;
