import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const FlashMessages = () => {
    const { flash } = usePage<any>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                position: 'top-right',
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }

        if (flash.error) {
            toast.error(flash.error, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }, [flash.success, flash.error]);

    return null;
};

export default FlashMessages;
