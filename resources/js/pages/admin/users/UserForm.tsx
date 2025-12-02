import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import PageTitle from '@/components/PageTitle';
import { Role, User } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, FormLabel, FormSelect, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState, useEffect } from 'react';

const userSchema = yup.object({
    first_name: yup.string().required('El nombre es requerido'),
    last_name: yup.string().required('Los apellidos son requeridos'),
    dni: yup.string().required('El DNI es requerido').matches(/^[0-9]{8}$/, 'El DNI debe contener exactamente 8 números'),
    email: yup.string().email('Email inválido').required('El email es requerido'),
    password: yup.string().test('password', 'La contraseña debe tener al menos 8 caracteres', function(value) {
        if (value && value.length > 0) {
            return value.length >= 8;
        }
        return true;
    }).optional().default(''),
    password_confirmation: yup.string().test('password_confirmation', 'Las contraseñas no coinciden', function(value) {
        const { password } = this.parent;
        if (password && password.length > 0) {
            return value === password;
        }
        return true;
    }).optional().default(''),
    role_id: yup.number().required('El rol es requerido'),
});

type UserFormData = yup.InferType<typeof userSchema>;

interface UserFormProps {
    user?: User;
    title: string;
    subTitle: string;
    cardTitle: string;
}

const UserForm = ({ user, title, subTitle, cardTitle }: UserFormProps) => {
    const { roles } = usePage<{ roles: Role[] }>().props;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { handleSubmit, control, watch } = useForm<UserFormData>({
        resolver: yupResolver(userSchema),
        defaultValues: {
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            dni: user?.dni || '',
            email: user?.email || '',
            password: '',
            password_confirmation: '',
            role_id: user?.role_id || undefined,
        },
    });

    const dniValue = watch('dni');

    // Auto-fill username with DNI when DNI changes
    useEffect(() => {
        if (dniValue && !user) {
            // In a real app, you might want to generate a username from DNI
            // For now, we'll just ensure it's not editable in the UI
        }
    }, [dniValue, user]);

    const onSubmit = (data: UserFormData) => {
        setIsSubmitting(true);

        const submitData = { ...data };

        if (user) {
            router.put(route('admin.users.update', user.id), submitData, {
                onFinish: () => setIsSubmitting(false),
            });
        } else {
            router.post(route('admin.users.store'), submitData, {
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
                                    <TextFormInput
                                        control={control}
                                        name="first_name"
                                        label="Nombres"
                                        placeholder="Ingrese los nombres"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="last_name"
                                        label="Apellidos"
                                        placeholder="Ingrese los apellidos"
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="dni"
                                        label="DNI"
                                        placeholder="Ingrese el DNI"
                                        containerClassName="mb-3"
                                        maxLength={8}
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
                                        label={user ? "Contraseña (dejar en blanco para no cambiar)" : "Contraseña"}
                                        type="password"
                                        placeholder={user ? "Ingrese la nueva contraseña" : "Ingrese la contraseña"}
                                        containerClassName="mb-3"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="password_confirmation"
                                        label="Confirmar Contraseña"
                                        type="password"
                                        placeholder="Confirme la contraseña"
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
                                    {isSubmitting ? (user ? 'Actualizando...' : 'Guardando...') : (user ? 'Actualizar' : 'Guardar')}
                                </Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

export default UserForm;