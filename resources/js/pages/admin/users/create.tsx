import MainLayout from '@/layouts/MainLayout';
import UserForm from './UserForm';

const CreateUserPage = () => {
    return (
        <UserForm
            title="Crear Usuario"
            subTitle="Usuarios"
            cardTitle="Ingresa la información del usuario"
        />
    );
};

CreateUserPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default CreateUserPage;
