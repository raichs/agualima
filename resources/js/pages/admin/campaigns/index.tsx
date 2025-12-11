import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination/Pagination';
import Table from '@/components/Table/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { PaginatedData, Campaign } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Card, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';

const getStatusBadgeVariant = (status: number): string => {
    switch (status) {
        case 1: return 'secondary'; // Planificada - gris
        case 2: return 'warning';   // En progreso - amarillo
        case 3: return 'info';      // Cerrada - azul
        case 4: return 'success';   // Completada - verde
        case 5: return 'danger';    // Cancelada - rojo
        default: return 'secondary';
    }
};

const CampaignsPage = () => {
    const { campaigns, total, statusOptions } = usePage<{
        campaigns: PaginatedData<Campaign>;
        total: number;
        statusOptions: Record<number, string>;
    }>().props;

    const availableStatusLabels = statusOptions;

    const { data, meta } = campaigns;
    const links = meta?.links || [];

    return (
        <>
            <PageTitle title="Campañas" subTitle="Administración" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between border-bottom border-light">
                            <div className="d-flex align-items-start gap-2 flex-column">
                                <h4 className="header-title mb-0">Lista de Campañas <span className="badge bg-primary ms-1 p-1">{total}</span></h4>
                            </div>
                            <div>
                                <Link href={route('admin.campaigns.create')} className="btn btn-primary">
                                    <IconifyIcon icon="tabler:plus" className="me-1" /> Nueva Campaña
                                </Link>
                            </div>
                        </CardHeader>
                        <Table
                            columns={[
                                { label: 'Nombre', name: 'name' },
                                { label: 'Fecha Inicio', name: 'start_date' },
                                { label: 'Fecha Fin', name: 'end_date' },
                                { label: 'Meta (kg)', name: 'target_total_kg' },
                                {
                                    label: 'Estado de Campaña',
                                    name: 'status',
                                    renderCell: (row: Campaign) => (
                                        <span className={`badge bg-${getStatusBadgeVariant(row.status)} p-1 fs-11`}>
                                            {availableStatusLabels[row.status] || 'Desconocido'}
                                        </span>
                                    )
                                },
                            ]}
                            rows={data}
                            showRoute="admin.campaigns.show"
                            editRoute="admin.campaigns.edit"
                            deleteRoute="admin.campaigns.destroy"
                            deleteOptions={{
                                title: '¿Eliminar campaña?',
                                text: 'Esta acción no se puede deshacer',
                                confirmButtonText: 'Sí, eliminar',
                                cancelButtonText: 'Cancelar',
                                successTitle: '¡Eliminado!',
                                successText: 'La campaña ha sido eliminada exitosamente'
                            }}
                            emptyMessage="No hay campañas registradas"
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

CampaignsPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default CampaignsPage;