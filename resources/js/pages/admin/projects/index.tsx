import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination/Pagination';
import Table from '@/components/Table/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { PaginatedData, Project } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {  Card, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';

const ProjectsPage = () => {
    const { projects, total } = usePage<{
        projects: PaginatedData<Project>;
        total: number;
    }>().props;

    const {
        data,
        meta: { links }
    } = projects;

    return (
        <>
            <PageTitle title="Proyectos" subTitle="Administración" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between border-bottom border-light">
                            <div className="d-flex align-items-start gap-2 flex-column">
                                <h4 className="header-title mb-0">Lista de Proyectos <span className="badge bg-primary ms-1 p-1">{total}</span></h4>
                            </div>
                            <div>
                                <Link href={route('admin.projects.create')} className="btn btn-primary">
                                    <IconifyIcon icon="tabler:plus" className="me-1" /> Nuevo Proyecto
                                </Link>
                            </div>
                        </CardHeader>
                        <Table
                            columns={[
                                { label: 'Nombre', name: 'name' },
                                { label: 'Descripción', name: 'description' },
                            ]}
                            rows={data}
                            showRoute="admin.projects.show"
                            editRoute="admin.projects.edit"
                            deleteRoute="admin.projects.destroy"
                            deleteOptions={{
                                title: '¿Eliminar proyecto?',
                                text: 'Esta acción no se puede deshacer',
                                confirmButtonText: 'Sí, eliminar',
                                cancelButtonText: 'Cancelar',
                                successTitle: '¡Eliminado!',
                                successText: 'El proyecto ha sido eliminado exitosamente'
                            }}
                            emptyMessage="No hay proyectos registrados"
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

ProjectsPage.layout = (page: React.ReactNode) => (
  <MainLayout children={page} />
);

export default ProjectsPage;
