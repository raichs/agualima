import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination/Pagination';
import Table from '@/components/Table/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { PaginatedData, Shift } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Card, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';

const ShiftsPage = () => {
    const { shifts, total } = usePage<{
        shifts: PaginatedData<Shift>;
        total: number;
    }>().props;

    const { data, meta } = shifts;
    const links = meta?.links || [];

    return (
        <>
            <PageTitle title="Turnos" subTitle="Administración" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between border-bottom border-light">
                            <div className="d-flex align-items-start gap-2 flex-column">
                                <h4 className="header-title mb-0">Lista de Turnos <span className="badge bg-primary ms-1 p-1">{total}</span></h4>
                            </div>
                            <div>
                                <Link href={route('admin.shifts.create')} className="btn btn-primary">
                                    <IconifyIcon icon="tabler:plus" className="me-1" /> Nuevo Turno
                                </Link>
                            </div>
                        </CardHeader>
                        <Table
                            columns={[
                                { label: 'Nombre', name: 'name' },
                            ]}
                            rows={data}
                            showRoute="admin.shifts.show"
                            editRoute="admin.shifts.edit"
                            deleteRoute="admin.shifts.destroy"
                            deleteOptions={{
                                title: '¿Eliminar turno?',
                                text: 'Esta acción no se puede deshacer',
                                confirmButtonText: 'Sí, eliminar',
                                cancelButtonText: 'Cancelar',
                                successTitle: '¡Eliminado!',
                                successText: 'El turno ha sido eliminado exitosamente'
                            }}
                            emptyMessage="No hay turnos registrados"
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

ShiftsPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default ShiftsPage;
