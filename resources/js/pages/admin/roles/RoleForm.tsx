import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import PageTitle from '@/components/PageTitle';
import { Role } from '@/types';
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

const roleSchema = yup.object({
    display_name: yup.string().required('El nombre del rol es requerido'),
    description: yup.string().default(''),
});

type RoleFormData = yup.InferType<typeof roleSchema>;

interface RoleFormProps {
    role?: Role;
    title: string;
    subTitle: string;
    cardTitle: string;
}

const RoleForm = ({ role, title, subTitle, cardTitle }: RoleFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { handleSubmit, control } = useForm<RoleFormData>({
        resolver: yupResolver(roleSchema),
        defaultValues: {
            display_name: role?.display_name ?? '',
            description: role?.description || '',
        },
    });

    const onSubmit = (data: RoleFormData) => {
        setIsSubmitting(true);

        if (role) {
            router.put(route('admin.roles.update', role.id), data, {
                onFinish: () => setIsSubmitting(false),
            });
        } else {
            router.post(route('admin.roles.store'), data, {
                onFinish: () => setIsSubmitting(false),
            });
        }
    };

    return (
        <>
            <PageTitle title={title} subTitle={subTitle} />
            <ComponentContainerCard title={cardTitle}>
                <Row>
                    <Col xs={12}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg={6}>
                                    <div className="mb-3">
                                        <TextFormInput
                                            control={control}
                                            name="display_name"
                                            label="Nombre del Rol"
                                            placeholder="Ej: Super Administrador, Gerente de Cultivo"
                                            containerClassName="mb-3"
                                        />
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className="mb-3">
                                        <TextAreaFormInput
                                            control={control}
                                            name="description"
                                            label="Descripción"
                                            placeholder="Ingrese una descripción del rol"
                                            containerClassName="mb-3"
                                            rows={3}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-end gap-2">
                                <Link href={route('admin.roles.index')} className="btn btn-light">
                                    Cancelar
                                </Link>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? (role ? 'Actualizando...' : 'Guardando...') : (role ? 'Actualizar' : 'Guardar')}
                                </Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

export default RoleForm;