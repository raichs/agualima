import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import PageTitle from '@/components/PageTitle';
import { Role, User } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, FormLabel, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import Select from 'react-select';

type UserFormData = {
    first_name: string;
    last_name: string;
    dni: string;
    email: string;
    password: string;
    password_confirmation: string;
    role_id: number;
};

interface UserFormProps {
    user?: User;
    title: string;
    subTitle: string;
    cardTitle: string;
}

const UserForm = ({ user, title, subTitle, cardTitle }: UserFormProps) => {
    const { roles, errors } = usePage<{ roles: Role[]; errors: Record<string, string> }>().props;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const roleOptions = roles.map((role) => ({
        value: role.id,
        label: role.display_name,
    }));

    const userSchema = yup.object({
        first_name: yup.string().required('El nombre es requerido'),
        last_name: yup.string().required('Los apellidos son requeridos'),
        dni: yup.string().required('El DNI es requerido').matches(/^[0-9]{8}$/, 'El DNI debe contener exactamente 8 números'),
        email: yup.string().email('Email inválido').required('El email es requerido'),
        password: user
            ? yup.string().test('password', 'La contraseña debe tener al menos 8 caracteres', function(value) {
                if (value && value.length > 0) {
                    return value.length >= 8;
                }
                return true;
            }).optional().default('')
            : yup.string().required('La contraseña es requerida').min(8, 'La contraseña debe tener al menos 8 caracteres'), // Requerida en creación
        password_confirmation: user
            ? yup.string().test('password_confirmation', 'Las contraseñas no coinciden', function(value) {
                const { password } = this.parent;
                if (password && password.length > 0) {
                    return value === password;
                }
                return true;
            }).optional().default('')
            : yup.string().oneOf([yup.ref('password')], 'Las contraseñas deben coincidir').required('La confirmación de contraseña es requerida'), // Requerida en creación
        role_id: yup.number().required('El rol es requerido'),
    });

    const { handleSubmit, control, watch, setError, clearErrors } = useForm<UserFormData>({
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
    const [usuario, setUsuario] = useState('');

    // Set server errors to form
    useEffect(() => {
        if (errors) {
            Object.keys(errors).forEach((field) => {
                setError(field as keyof UserFormData, {
                    type: 'server',
                    message: errors[field],
                });
            });
        }
    }, [errors, setError]);

    // Clear server errors when user starts typing
    const handleFieldChange = (fieldName: keyof UserFormData) => {
        if (errors && errors[fieldName]) {
            clearErrors(fieldName);
        }
    };

    // Auto-fill usuario with DNI when DNI changes
    useEffect(() => {
        setUsuario(dniValue || '');
    }, [dniValue]);

    const selectStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            borderColor: state.selectProps.error ? '#dc3545' : provided.borderColor,
            '&:hover': {
                borderColor: state.selectProps.error ? '#dc3545' : provided.borderColor
            }
        })
    };

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
                                        onChange={() => handleFieldChange('first_name')}
                                    />
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="last_name"
                                        label="Apellidos"
                                        placeholder="Ingrese los apellidos"
                                        containerClassName="mb-3"
                                        onChange={() => handleFieldChange('last_name')}
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
                                        onChange={() => handleFieldChange('dni')}
                                    />
                                </Col>
                                <Col lg={6}>
                                    {/* Campo usuario desactivado y autocompletado con el DNI */}
                                    <div className="mb-3">
                                        <FormLabel>Usuario</FormLabel>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={usuario}
                                            disabled
                                            placeholder="Usuario"
                                        />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="email"
                                        label="Email"
                                        type="email"
                                        placeholder="Ingrese el email"
                                        containerClassName="mb-3"
                                        onChange={() => handleFieldChange('email')}
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
                                                    <Select
                                                        {...field}
                                                        value={roleOptions.find((option) => option.value === field.value) || null}
                                                        onChange={(option) => field.onChange(option?.value || null)}
                                                        options={roleOptions}
                                                        placeholder="Seleccione un rol"
                                                        classNamePrefix="react-select"
                                                        styles={selectStyles}
                                                        error={!!fieldState.error}
                                                        onBlur={() => handleFieldChange('role_id')}
                                                    />
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
                                <Col lg={6}>
                                    <TextFormInput
                                        control={control}
                                        name="password"
                                        label={user ? "Contraseña (dejar en blanco para no cambiar)" : "Contraseña"}
                                        type="password"
                                        placeholder={user ? "Ingrese la nueva contraseña" : "Ingrese la contraseña"}
                                        containerClassName="mb-3"
                                        onChange={() => handleFieldChange('password')}
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
                                        onChange={() => handleFieldChange('password_confirmation')}
                                    />
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