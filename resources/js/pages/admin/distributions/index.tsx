import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination/Pagination';
import Table from '@/components/Table/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { PaginatedData, Distribution } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Card, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';

const DistributionsPage = () => {
    const { distributions, total } = usePage<{
        distributions: PaginatedData<Distribution>;
        total: number;
    }>().props;

    const { data, meta } = distributions;
    const links = meta?.links || [];

    return (
        <>
            <PageTitle title="Distribuciones" subTitle="Administración" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between border-bottom border-light">
                            <div className="d-flex align-items-start gap-2 flex-column">
                                <h4 className="header-title mb-0">Lista de Distribuciones <span className="badge bg-primary ms-1 p-1">{total}</span></h4>
                            </div>
                            <div>
                                <Link href={route('admin.distributions.create')} className="btn btn-primary">
                                    <IconifyIcon icon="tabler:plus" className="me-1" /> Nueva Distribución
                                </Link>
                            </div>
                        </CardHeader>
                        <Table
                            columns={[
                                { label: 'Proyecto', name: 'project_name' },
                                { label: 'Variedad', name: 'variety_name' },
                                { label: 'Turno', name: 'shift_name' },
                                { label: 'Lote', name: 'lot_code' },
                                { label: 'Área', name: 'total_area' },
                                { label: 'Nº Campaña', name: 'campaign_number' },
                                { label: 'Densidad', name: 'density' },
                                { label: 'Fecha de siembra', name: 'planting_date' },
                                { label: 'Fecha de poda', name: 'pruning_date' },
                            ]}
                            rows={data}
                            showRoute="admin.distributions.show"
                            editRoute="admin.distributions.edit"
                            deleteRoute="admin.distributions.destroy"
                            deleteOptions={{
                                title: '¿Eliminar distribución?',
                                text: 'Esta acción no se puede deshacer',
                                confirmButtonText: 'Sí, eliminar',
                                cancelButtonText: 'Cancelar',
                                successTitle: '¡Eliminado!',
                                successText: 'La distribución ha sido eliminada exitosamente'
                            }}
                            emptyMessage="No hay distribuciones registradas"
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

DistributionsPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default DistributionsPage;
