import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination/Pagination';
import Table from '@/components/Table/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { PaginatedData, Lot } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Card, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';

const LotsPage = () => {
    const { lots, total } = usePage<{
        lots: PaginatedData<Lot>;
        total: number;
    }>().props;

    const { data, meta } = lots;
    const links = meta?.links || [];

    return (
        <>
            <PageTitle title="Lotes" subTitle="Administración" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between border-bottom border-light">
                            <div className="d-flex align-items-start gap-2 flex-column">
                                <h4 className="header-title mb-0">Lista de Lotes <span className="badge bg-primary ms-1 p-1">{total}</span></h4>
                            </div>
                            <div>
                                <Link href={route('admin.lots.create')} className="btn btn-primary">
                                    <IconifyIcon icon="tabler:plus" className="me-1" /> Nuevo Lote
                                </Link>
                            </div>
                        </CardHeader>
                        <Table
                            columns={[
                                { label: 'Código', name: 'code' },
                                { label: 'Nombre', name: 'name' },
                                { label: 'Descripción', name: 'description' },
                            ]}
                            rows={data}
                            showRoute="admin.lots.show"
                            editRoute="admin.lots.edit"
                            deleteRoute="admin.lots.destroy"
                            deleteOptions={{
                                title: '¿Eliminar lote?',
                                text: 'Esta acción no se puede deshacer',
                                confirmButtonText: 'Sí, eliminar',
                                cancelButtonText: 'Cancelar',
                                successTitle: '¡Eliminado!',
                                successText: 'El lote ha sido eliminado exitosamente'
                            }}
                            emptyMessage="No hay lotes registrados"
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

LotsPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default LotsPage;
