import MainLayout from '@/layouts/MainLayout';
import { Shift } from '@/types';
import { usePage } from '@inertiajs/react';
import ShiftForm from './ShiftForm';

const EditShiftPage = () => {
    const { shift } = usePage<{
        shift: Shift;
    }>().props;

    return (
        <ShiftForm
            shift={shift}
            title="Editar Turno"
            subTitle="Turnos"
            cardTitle="Actualiza la información del turno"
        />
    );
};

EditShiftPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default EditShiftPage;
