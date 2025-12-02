import MainLayout from '@/layouts/MainLayout';
import UserForm from './UserForm';

interface EditUserPageProps {
    user: any;
}

const EditUserPage = ({ user }: EditUserPageProps) => {
    return (
        <UserForm
            user={user}
            title="Editar Usuario"
            subTitle="Usuarios"
            cardTitle="Editar información del usuario"
        />
    );
};

EditUserPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default EditUserPage;
