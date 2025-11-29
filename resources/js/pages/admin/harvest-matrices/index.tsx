import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination/Pagination';
import Table from '@/components/Table/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { HarvestMatrix, PaginatedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Badge, Card, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';

const HarvestMatricesPage = () => {
    const { matrices, statuses } = usePage<{
        matrices: PaginatedData<HarvestMatrix>;
        statuses: Array<{ value: string; label: string }>;
    }>().props;

    const { data, meta } = matrices;
    const links = meta?.links || [];

    // Agregar badges de estado en la tabla
    const dataWithBadges = data.map(matrix => ({
        ...matrix,
        status_badge: (
            <Badge bg={matrix.status_color}>
                {matrix.status_label}
            </Badge>
        ),
        week_display: `Semana ${matrix.week_number} - ${matrix.year}`,
        kg_progress: matrix.kg_target 
            ? `${matrix.kg_executed.toLocaleString()} / ${matrix.kg_target.toLocaleString()} kg (${matrix.completion_percentage}%)`
            : `${matrix.kg_executed.toLocaleString()} kg`,
        alerts: matrix.has_active_alerts ? (
            <Badge bg="danger"><IconifyIcon icon="tabler:alert-triangle" /> Alertas</Badge>
        ) : (
            <Badge bg="success"><IconifyIcon icon="tabler:check" /> Sin alertas</Badge>
        ),
    }));

    return (
        <>
            <PageTitle title="Matrices de Cosecha" subTitle="Programación de Cosecha" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between border-bottom border-light">
                            <h4 className="header-title">Lista de Matrices de Cosecha</h4>
                            <div>
                                <Link href={route('admin.harvest-matrices.create')} className="btn btn-primary">
                                    <IconifyIcon icon="tabler:plus" className="me-1" /> Nueva Matriz
                                </Link>
                            </div>
                        </CardHeader>
                        <Table
                            columns={[
                                { label: 'Nombre', name: 'name' },
                                { label: 'Semana', name: 'week_display' },
                                { label: 'Estado', name: 'status_badge' },
                                { label: 'Progreso Kg', name: 'kg_progress' },
                                { label: 'Personal', name: 'total_staff' },
                                { label: 'Alertas', name: 'alerts' },
                            ]}
                            rows={dataWithBadges}
                            showRoute="admin.harvest-matrices.show"
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
                            <Pagination links={links} />
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

HarvestMatricesPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default HarvestMatricesPage;
