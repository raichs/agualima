import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination/Pagination';
import Table from '@/components/Table/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { PaginatedData, Nursery } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Card, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';

const NurseriesPage = () => {
    const { nurseries, total } = usePage<{
        nurseries: PaginatedData<Nursery>;
        total: number;
    }>().props;

    const { data, meta } = nurseries;
    const links = meta?.links || [];

    return (
        <>
            <PageTitle title="Viveros" subTitle="Administración" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between border-bottom border-light">
                            <div className="d-flex align-items-start gap-2 flex-column">
                                <h4 className="header-title mb-0">Lista de Viveros <span className="badge bg-primary ms-1 p-1">{total}</span></h4>
                            </div>
                            <div>
                                <Link href={route('admin.nurseries.create')} className="btn btn-primary">
                                    <IconifyIcon icon="tabler:plus" className="me-1" /> Nuevo Vivero
                                </Link>
                            </div>
                        </CardHeader>
                        <Table
                            columns={[
                                { label: 'Nombre', name: 'name' },
                                { label: 'Descripción', name: 'description' },
                                { label: 'País', name: 'country_name' },
                            ]}
                            rows={data}
                            showRoute="admin.nurseries.show"
                            editRoute="admin.nurseries.edit"
                            deleteRoute="admin.nurseries.destroy"
                            deleteOptions={{
                                title: '¿Eliminar vivero?',
                                text: 'Esta acción no se puede deshacer',
                                confirmButtonText: 'Sí, eliminar',
                                cancelButtonText: 'Cancelar',
                                successTitle: '¡Eliminado!',
                                successText: 'El vivero ha sido eliminado exitosamente'
                            }}
                            emptyMessage="No hay viveros registrados"
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

NurseriesPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default NurseriesPage;
