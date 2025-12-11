import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import PageTitle from '@/components/PageTitle';
import { Role } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState, useEffect } from 'react';

type MenuItem = {
    id: number;
    key: string;
    label: string;
    icon?: string;
    url?: string;
    is_title?: boolean;
    permission: string | null;
    parent_id: number | null;
    children?: MenuItem[];
};

type RoleFormData = {
    display_name: string;
    description: string;
    permissions: string[];
};

interface RoleFormProps {
    role?: Role;
    title: string;
    subTitle: string;
    cardTitle: string;
}

const RoleForm = ({ role, title, subTitle, cardTitle }: RoleFormProps) => {
    const { allMenus, rolePermissions, errors } = usePage<{
        allMenus: MenuItem[];
        rolePermissions: string[];
        errors: Record<string, string>;
    }>().props;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const roleSchema = yup.object({
        display_name: yup.string().required('El nombre del rol es requerido'),
        description: yup.string().default(''),
        permissions: yup.array().of(yup.string().required()).default([]),
    });

    const { handleSubmit, control, setError, clearErrors, setValue, watch } = useForm<RoleFormData>({
        resolver: yupResolver(roleSchema),
        defaultValues: {
            display_name: role?.display_name ?? '',
            description: role?.description || '',
            permissions: [...(rolePermissions || []), 'view_dashboard'], // Always include dashboard
        },
    });

    const selectedPermissions = watch('permissions');
    const filteredMenus = allMenus || [];

    // Set server errors to form
    useEffect(() => {
        if (errors) {
            Object.keys(errors).forEach((field) => {
                setError(field as keyof RoleFormData, {
                    type: 'server',
                    message: errors[field],
                });
            });
        }
    }, [errors, setError]);

    // Clear server errors when user starts typing
    const handleFieldChange = (fieldName: keyof RoleFormData) => {
        if (errors && errors[fieldName]) {
            clearErrors(fieldName);
        }
    };

    const handlePermissionChange = (permission: string, checked: boolean) => {
        const current = selectedPermissions || [];
        if (checked) {
            setValue('permissions', [...current, permission]);
        } else {
            setValue('permissions', current.filter(p => p !== permission));
        }
    };

    const renderMenuItem = (item: MenuItem, level = 0) => {
        if (item.is_title) {
            return (
                <div key={item.key} style={{ marginLeft: level * 20, marginTop: '10px', marginBottom: '5px' }}>
                    <strong>{item.label}</strong>
                    {item.children && item.children.map(child => renderMenuItem(child, level))}
                </div>
            );
        }

        const permission = item.permission || `view_${item.key}`;
        const isChecked = selectedPermissions?.includes(permission) || false;

        return (
            <div key={item.key} style={{ marginLeft: level * 20 }}>
                <Form.Check
                    type="checkbox"
                    id={`menu-${item.key}`}
                    label={item.label}
                    checked={isChecked}
                    onChange={(e) => handlePermissionChange(permission, e.target.checked)}
                />
                {item.children && item.children.map(child => renderMenuItem(child, level + 1))}
            </div>
        );
    };

    const onSubmit = (data: RoleFormData) => {
        setIsSubmitting(true);

        // Always include dashboard permission
        const permissionsWithDashboard = [...(data.permissions || []), 'view_dashboard'];

        const submitData = { ...data, permissions: permissionsWithDashboard };

        if (role) {
            router.put(route('admin.roles.update', role.id), submitData, {
                onFinish: () => setIsSubmitting(false),
            });
        } else {
            router.post(route('admin.roles.store'), submitData, {
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
                                            onChange={() => handleFieldChange('display_name')}
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
                                            onChange={() => handleFieldChange('description')}
                                        />
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className="mb-3">
                                        <Form.Label>Permisos de Menú</Form.Label>
                                        <div className="border p-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                            {filteredMenus.map(item => renderMenuItem(item))}
                                        </div>
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