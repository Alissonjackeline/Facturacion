import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import TextField from "../../../../global/components/shared/TextField";
import Checkbox from "../../../../global/components/ui/form/Checkbox";
import Button from "../../../../global/components/ui/Button";
import BrandLogo from "../../../../global/components/ui/BrandLogo";
import { ROUTES } from "../../../../routes/routes";

export default function LoginContainer() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <>
            <BrandLogo title="FacturEnterprise" subtitle="Acceso corporativo" />

            <div className="w-full">
                <h3 className="text-neutral-900">Iniciar sesión</h3>
                <p className="font-body-normal-regular text-neutral-600">
                    Ingresa tus credenciales para continuar
                </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <TextField
                    label="Correo electrónico"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    tag={{ text: "Requerido", variant: "required" }}
                    placeholder="nombre@empresa.com"
                    leftIcon={<Mail />}
                />
                <TextField
                    label="Contraseña"
                    type={show ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    tag={{ text: "Requerido", variant: "required" }}
                    placeholder="Ingresa tu contraseña"
                    leftIcon={<Lock />}
                    rightIcon={
                        <button
                            type="button"
                            aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
                            onClick={() => setShow((s) => !s)}
                        >
                            {show ? <EyeOff /> : <Eye />}
                        </button>
                    }
                />

                <div className="w-full flex flex-row justify-between">
                    <Checkbox
                        label="Recordarme"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                    />
                    <Link
                        to={ROUTES.RECOVER_PASSWORD}
                        className="font-action-normal text-primary-500"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                <Button type="submit" variant="primary" size="md">
                    Ingresar
                </Button>
            </form>

            <p className="font-body-normal-regular text-neutral-600">
                ¿Necesitas ayuda?{" "}
                <a href="mailto:admin@empresa.com" className="text-neutral-900">
                    Contacta al administrador
                </a>
            </p>
        </>
    );
}