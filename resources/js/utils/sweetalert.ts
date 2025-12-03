import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ReactSwal = withReactContent(Swal);

interface DeleteConfirmOptions {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  successTitle?: string;
  successText?: string;
  errorTitle?: string;
  errorText?: string;
}

/**
 * Muestra un diálogo de confirmación para eliminar un recurso
 * @param route Ruta de eliminación (debe ser una ruta DELETE)
 * @param options Opciones personalizables para los mensajes
 * @returns Promise que se resuelve cuando se completa la acción
 */
export const confirmDelete = async (
  route: string,
  options: DeleteConfirmOptions = {}
): Promise<boolean> => {
  const {
    title = '¿Estás seguro?',
    text = 'No podrás revertir esta acción',
    confirmButtonText = 'Sí, eliminar',
    cancelButtonText = 'Cancelar',
    successTitle = 'Eliminado',
    successText = 'El registro ha sido eliminado exitosamente',
    errorTitle = 'Error',
    errorText = 'Hubo un problema al eliminar el registro'
  } = options;

  try {
    const result = await ReactSwal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      customClass: {
        confirmButton: 'btn btn-danger mt-2',
        cancelButton: 'btn btn-secondary mt-2 me-2'
      },
      buttonsStyling: false,
      showCloseButton: true,
      reverseButtons: true
    });

    if (result.isConfirmed) {
      // Realizar la petición DELETE usando Inertia
      router.delete(route, {
        preserveScroll: true,
        onSuccess: () => {
          // ReactSwal.fire({
          //   title: successTitle,
          //   text: successText,
          //   icon: 'success',
          //   customClass: {
          //     confirmButton: 'btn btn-primary mt-2'
          //   },
          //   buttonsStyling: false,
          //   timer: 2000,
          //   timerProgressBar: true
          // });
        },
        onError: () => {
          ReactSwal.fire({
            title: errorTitle,
            text: errorText,
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary mt-2'
            },
            buttonsStyling: false
          });
        }
      });

      return true;
    }

    return false;
  } catch (error) {
    console.error('Error en confirmDelete:', error);
    return false;
  }
};

/**
 * Muestra un mensaje de éxito simple
 */
export const showSuccess = (title: string, text?: string) => {
  return ReactSwal.fire({
    title,
    text,
    icon: 'success',
    customClass: {
      confirmButton: 'btn btn-primary mt-2'
    },
    buttonsStyling: false,
    timer: 2000,
    timerProgressBar: true
  });
};

/**
 * Muestra un mensaje de error simple
 */
export const showError = (title: string, text?: string) => {
  return ReactSwal.fire({
    title,
    text,
    icon: 'error',
    customClass: {
      confirmButton: 'btn btn-primary mt-2'
    },
    buttonsStyling: false
  });
};

/**
 * Muestra un mensaje de advertencia simple
 */
export const showWarning = (title: string, text?: string) => {
  return ReactSwal.fire({
    title,
    text,
    icon: 'warning',
    customClass: {
      confirmButton: 'btn btn-primary mt-2'
    },
    buttonsStyling: false
  });
};

/**
 * Muestra un mensaje de información simple
 */
export const showInfo = (title: string, text?: string) => {
  return ReactSwal.fire({
    title,
    text,
    icon: 'info',
    customClass: {
      confirmButton: 'btn btn-primary mt-2'
    },
    buttonsStyling: false
  });
};

export const confirmResetPassword = async (
  route: string,
  options: DeleteConfirmOptions = {}
): Promise<boolean> => {
  const {
    title = '¿Restablecer contraseña?',
    text = 'La contraseña se restablecerá al DNI del usuario',
    confirmButtonText = 'Sí, restablecer',
    cancelButtonText = 'Cancelar',
    successTitle = 'Contraseña restablecida',
    successText = 'La contraseña ha sido restablecida al DNI del usuario',
    errorTitle = 'Error',
    errorText = 'Hubo un problema al restablecer la contraseña'
  } = options;

  try {
    const result = await ReactSwal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      customClass: {
        confirmButton: 'btn btn-warning mt-2',
        cancelButton: 'btn btn-secondary mt-2 me-2'
      },
      buttonsStyling: false,
      showCloseButton: true,
      reverseButtons: true
    });

    if (result.isConfirmed) {
      router.post(route, {}, {
        preserveScroll: true,
        onSuccess: () => {
        },
        onError: () => {
          ReactSwal.fire({
            title: errorTitle,
            text: errorText,
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary mt-2'
            },
            buttonsStyling: false
          });
        }
      });

      return true;
    }

    return false;
  } catch (error) {
    console.error('Error en confirmResetPassword:', error);
    return false;
  }
};