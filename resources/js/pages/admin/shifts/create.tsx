import MainLayout from '@/layouts/MainLayout';
import ShiftForm from './ShiftForm';

const CreateShiftPage = () => {
    return (
        <ShiftForm
            title="Crear Turno"
            subTitle="Turnos"
            cardTitle="Ingresa la información del turno"
        />
    );
};

CreateShiftPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default CreateShiftPage;
