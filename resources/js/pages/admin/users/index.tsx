import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination/Pagination';
import Table from '@/components/Table/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { PaginatedData, User } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Card, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { confirmResetPassword } from '@/utils/sweetalert';

const UsersPage = () => {
    const { users, total } = usePage<{
        users: PaginatedData<User>;
        total: number;
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
                            <div className="d-flex align-items-start gap-2 flex-column">
                                <h4 className="header-title mb-0">Lista de Usuarios <span className="badge bg-primary ms-1 p-1">{total}</span></h4>
                            </div>
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
                                <Button
                                    variant="soft-warning"
                                    size="sm"
                                    className="btn-icon rounded-circle me-2"
                                    onClick={() => confirmResetPassword(route('admin.users.reset-password', user.id))}
                                    title="Restablecer contraseña"
                                >
                                    <IconifyIcon icon="tabler:key" />
                                </Button>
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
