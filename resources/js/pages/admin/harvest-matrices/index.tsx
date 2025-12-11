import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination/Pagination';
import Table from '@/components/Table/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { HarvestMatrix, PaginatedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Badge, Card, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';

const HarvestMatricesPage = () => {
    const { matrices, total } = usePage<{
        matrices: PaginatedData<HarvestMatrix>;
        total: number;
    }>().props;

    const { data, meta } = matrices;
    const links = meta?.links || [];

    // Agregar campos calculados para la tabla
    const dataWithCalculatedFields = data.map(matrix => ({
        ...matrix,
        name: matrix.user?.name || 'Sin asignar',
        week_display: `Semana ${matrix.week_number} - ${matrix.year}`
    }));

    return (
        <>
            <PageTitle title="Matrices de Cosecha" subTitle="Programación de Cosecha" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between border-bottom border-light">
                            <div className="d-flex align-items-start gap-2 flex-column">
                                <h4 className="header-title mb-0">Lista de Matrices de Cosecha <span className="badge bg-primary ms-1 p-1">{total}</span></h4>
                            </div>
                            <div>
                                <Link href={route('admin.harvest-matrices.create')} className="btn btn-primary">
                                    <IconifyIcon icon="tabler:plus" className="me-1" /> Nueva Matriz
                                </Link>
                            </div>
                        </CardHeader>
                        <Table
                            columns={[
                                { label: 'Responsable', name: 'name' },
                                { label: 'Semana', name: 'week_display' },
                                { label: 'Fecha de registro', name: 'created_at' },
                            ]}
                            rows={dataWithCalculatedFields}
                            editRoute="admin.harvest-matrices.edit"
                            deleteRoute="admin.harvest-matrices.destroy"
                            deleteOptions={{
                                title: '¿Eliminar matriz?',
                                text: 'Esta acción eliminará toda la programación asociada',
                                confirmButtonText: 'Sí, eliminar',
                                cancelButtonText: 'Cancelar',
                                successTitle: '¡Eliminada!',
                                successText: 'La matriz ha sido eliminada exitosamente'
                            }}
                            emptyMessage="No hay matrices de cosecha registradas"
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

HarvestMatricesPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default HarvestMatricesPage;
