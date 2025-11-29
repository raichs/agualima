import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import PageTitle from '@/components/PageTitle';
import MainLayout from '@/layouts/MainLayout';
import { Role } from '@/types';
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

const roleSchema = yup.object({
    name: yup.string().required('El nombre del rol es requerido'),
});

type RoleFormData = yup.InferType<typeof roleSchema>;

interface EditRolePageProps {
    role: Role;
}

const EditRolePage = ({ role }: EditRolePageProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { handleSubmit, control } = useForm<RoleFormData>({
        resolver: yupResolver(roleSchema),
        defaultValues: {
            name: role.name || '',
        },
    });

    const onSubmit = (data: RoleFormData) => {
        setIsSubmitting(true);
        router.put(route('admin.roles.update', role.id), data, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <>
            <PageTitle title="Editar Rol" subTitle="Roles" />
            <ComponentContainerCard title="Editar información del rol">
                <Row>
                    <Col xs={12}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg={6}>
                                    <div className="mb-3">
                                        <TextFormInput
                                            control={control}
                                            name="name"
                                            label="Nombre del Rol"
                                            placeholder="Ingrese el nombre del rol"
                                            containerClassName="mb-3"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-end gap-2">
                                <Link href={route('admin.roles.index')} className="btn btn-light">
                                    Cancelar
                                </Link>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Actualizando...' : 'Actualizar'}
                                </Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

EditRolePage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default EditRolePage;
