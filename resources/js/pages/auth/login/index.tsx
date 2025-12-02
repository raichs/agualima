import logoDark from '@/images/logo.png';
import logo from '@/images/logo.png';
import BaseLayout from '@/layouts/BaseLayout';

import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button, Card, Col, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';

import { currentYear, developedBy, developedByWebSite } from '@/context/constants';

type LoginForm = {
    dni: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

const LoginPage = ({ canResetPassword }: LoginProps) => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        dni: '',
        password: '',
        remember: true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <BaseLayout>
            <Head title="Login" />
            <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
                <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
                    <Col xl={4} lg={5} md={6}>
                        <Card className="overflow-hidden text-center h-100 p-xxl-4 p-3 mb-0">
                            <Link href="/" className="auth-brand mb-3">
                                <img src={logoDark} alt="dark logo" width={160} className="logo-dark" />
                                <img src={logo} alt="logo light" width={160} className="logo-light" />
                            </Link>
                            <h3 className="fw-semibold mb-2">Ingresa a tu cuenta</h3>
                            <p className="text-muted mb-4">Ingresa tu DNI y contraseña para acceder al panel de administración.</p>

                            <form onSubmit={submit} className="text-start mb-3">
                                <FormGroup className="mb-3">
                                    <FormLabel>DNI</FormLabel>
                                    <FormControl
                                        type="text"
                                        placeholder="Ingrese su DNI"
                                        value={data.dni}
                                        onChange={(e) => setData('dni', e.target.value)}
                                    />
                                    {errors.dni && <p className="text-danger">{errors.dni}</p>}
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl
                                        type="password"
                                        placeholder="Enter your password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && <p className="text-danger">{errors.password}</p>}
                                </FormGroup>

                                <div className="d-flex justify-content-between mb-3">
                                    <FormCheck checked={data.remember} onChange={() => setData('remember', !data.remember)} label="Recuérdame" />

                                    {canResetPassword && (
                                        <span className="text-muted border-bottom border-dashed" style={{ cursor: 'not-allowed' }}>
                                            ¿Olvidaste tu contraseña?
                                        </span>
                                    )}
                                </div>
                                <div className="d-grid">
                                    <Button variant="primary" type="submit" disabled={processing} style={{ backgroundColor: '#0A8F69', borderColor: '#0A8F69' }}>
                                        Iniciar Sesión
                                    </Button>
                                </div>
                            </form>

                            <p className="mt-auto mb-0">
                                {currentYear} © Desarollado por{' '}
                                <a href={developedByWebSite} target="_blank" rel="noopener noreferrer">
                                    {developedBy}
                                </a>
                            </p>
                        </Card>
                    </Col>
                </Row>
            </div>
        </BaseLayout>
    );
};

export default LoginPage;
