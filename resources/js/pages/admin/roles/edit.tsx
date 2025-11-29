import MainLayout from '@/layouts/MainLayout';
import { Role } from '@/types';
import RoleForm from '@/pages/admin/roles/RoleForm';

interface EditRolePageProps {
    role: Role;
}

const EditRolePage = ({ role }: EditRolePageProps) => {
    return (
        <RoleForm
            role={role}
            title="Editar Rol"
            subTitle="Roles"
            cardTitle="Editar información del rol"
        />
    );
};

EditRolePage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default EditRolePage;
