import MainLayout from '@/layouts/MainLayout';
import { Nursery } from '@/types';
import NurseryForm from '@/pages/admin/nurseries/NurseryForm';

interface EditNurseryPageProps {
    nursery: Nursery;
}

const EditNurseryPage = ({ nursery }: EditNurseryPageProps) => {
    return (
        <NurseryForm
            nursery={nursery}
            title="Editar Vivero"
            subTitle="Viveros"
            cardTitle="Editar información del vivero"
        />
    );
};

EditNurseryPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default EditNurseryPage;
