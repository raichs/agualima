import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Dropdown, DropdownHeader, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';

const ProfileDropdown = () => {
    const { auth } = usePage<PageProps>().props;

    return (
        <div className="topbar-item nav-user">
            <Dropdown align={'end'}>
                <DropdownToggle
                    as={'a'}
                    className="topbar-link drop-arrow-none px-2"
                    data-bs-toggle="dropdown"
                    data-bs-offset="0,19"
                    type="button"
                    aria-haspopup="false"
                    aria-expanded="false"
                >
                    <img src="https://placehold.co/150x150" width={32} className="rounded-circle me-lg-2 d-flex" alt="user-image" />
                    <span className="d-lg-flex flex-column gap-1 d-none">
                        <h5 className="my-0">{auth.user?.name}</h5>
                        <h6 className="my-0 fw-normal">{auth.user?.email}</h6>
                    </span>
                    <IconifyIcon icon="tabler:chevron-down" className="d-none d-lg-block align-middle ms-2" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <DropdownHeader className="noti-title">
                        <h6 className="text-overflow m-0">Bienvenido !</h6>
                    </DropdownHeader>
                    <DropdownItem>
                        <IconifyIcon icon="tabler:user-hexagon" className="me-1 fs-17 align-middle" />
                        <span className="align-middle">Mi Cuenta</span>
                    </DropdownItem>
                    <div className="dropdown-divider" />
                    <DropdownItem
                        as={Link}
                        href={route('logout')}
                        method="post"
                        className="active fw-semibold text-danger w-100 text-start"
                        style={{ textDecoration: 'none', fontWeight: '600' }}
                        >
                        <IconifyIcon icon="tabler:logout" className="me-1 fs-17 align-middle" />
                        Cerrar Sesión
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default ProfileDropdown;
