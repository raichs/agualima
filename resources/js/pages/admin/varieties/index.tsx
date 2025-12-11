import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination/Pagination';
import Table from '@/components/Table/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { PaginatedData, Variety } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Card, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';

const VarietiesPage = () => {
    const { varieties, total } = usePage<{
        varieties: PaginatedData<Variety>;
        total: number;
    }>().props;

    const { data, meta } = varieties;
    const links = meta?.links || [];

    return (
        <>
            <PageTitle title="Variedades" subTitle="Administración" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between border-bottom border-light">
                            <div className="d-flex align-items-start gap-2 flex-column">
                                <h4 className="header-title mb-0">Lista de Variedades <span className="badge bg-primary ms-1 p-1">{total}</span></h4>
                            </div>
                            <div>
                                <Link href={route('admin.varieties.create')} className="btn btn-primary">
                                    <IconifyIcon icon="tabler:plus" className="me-1" /> Nueva Variedad
                                </Link>
                            </div>
                        </CardHeader>
                        <Table
                            columns={[
                                { label: 'Nombre', name: 'name' },
                                { label: 'Vivero', name: 'nursery_name' },
                            ]}
                            rows={data}
                            showRoute="admin.varieties.show"
                            editRoute="admin.varieties.edit"
                            deleteRoute="admin.varieties.destroy"
                            deleteOptions={{
                                title: '¿Eliminar variedad?',
                                text: 'Esta acción no se puede deshacer',
                                confirmButtonText: 'Sí, eliminar',
                                cancelButtonText: 'Cancelar',
                                successTitle: '¡Eliminado!',
                                successText: 'La variedad ha sido eliminada exitosamente'
                            }}
                            emptyMessage="No hay variedades registradas"
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

VarietiesPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default VarietiesPage;
