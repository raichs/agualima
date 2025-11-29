import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination/Pagination';
import Table from '@/components/Table/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { PaginatedData, Lot } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Card, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';

const LotsPage = () => {
    const { lots } = usePage<{
        lots: PaginatedData<Lot>;
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
                            <h4 className="header-title">Lista de Lotes</h4>
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
