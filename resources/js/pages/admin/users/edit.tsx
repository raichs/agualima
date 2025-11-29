import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import PageTitle from '@/components/PageTitle';
import MainLayout from '@/layouts/MainLayout';
import { Role, User } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, FormLabel, FormSelect, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

const userSchema = yup.object({
    name: yup.string().required('El nombre es requerido'),
    email: yup.string().email('Email inválido').required('El email es requerido'),
    password: yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').optional().default(''),
    password_confirmation: yup.string().optional().default(''),
    role_id: yup.number().required('El rol es requerido'),
});

type UserFormData = yup.InferType<typeof userSchema>;

interface EditUserPageProps {
    user: User;
}

const EditUserPage = ({ user }: EditUserPageProps) => {
    const { roles } = usePage<{ roles: Role[] }>().props;
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { handleSubmit, control } = useForm<UserFormData>({
        resolver: yupResolver(userSchema),
        defaultValues: {
            name: user.name || '',
            email: user.email || '',
            password: '',
            password_confirmation: '',
            role_id: user.role_id || undefined,
        },
    });

    const onSubmit = (data: UserFormData) => {
        setIsSubmitting(true);
        router.put(route('admin.users.update', user.id), data, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <>
            <PageTitle title="Editar Usuario" subTitle="Usuarios" />
            <ComponentContainerCard title="Editar información del usuario">
                <Row>
                    <Col xs={12}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="name"
                                        label="Nombre Completo"
                                        placeholder="Ingrese el nombre completo"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="email"
                                        label="Email"
                                        type="email"
                                        placeholder="Ingrese el email"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="password"
                                        label="Contraseña (dejar en blanco para no cambiar)"
                                        type="password"
                                        placeholder="Ingrese la nueva contraseña"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="password_confirmation"
                                        label="Confirmar Contraseña"
                                        type="password"
                                        placeholder="Confirme la nueva contraseña"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <div className="mb-3">
                                        <FormLabel>Rol</FormLabel>
                                        <Controller
                                            name="role_id"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <FormSelect
                                                        {...field}
                                                        isInvalid={!!fieldState.error}
                                                        value={field.value || ''}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                    >
                                                        <option value="">Seleccione un rol</option>
                                                        {roles.map((role) => (
                                                            <option key={role.id} value={role.id}>
                                                                {role.label || role.name}
                                                            </option>
                                                        ))}
                                                    </FormSelect>
                                                    {fieldState.error && (
                                                        <div className="invalid-feedback d-block">
                                                            {fieldState.error.message}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-end gap-2">
                                <Link href={route('admin.users.index')} className="btn btn-light">
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

EditUserPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default EditUserPage;
