import MainLayout from '@/layouts/MainLayout';
import RoleForm from '@/pages/admin/roles/RoleForm';

const CreateRolePage = () => {
    return (
        <RoleForm
            title="Crear Rol"
            subTitle="Roles"
            cardTitle="Ingresa la información del rol"
        />
    );
};

CreateRolePage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default CreateRolePage;
