import { ChevronLeft, CircleQuestionMark, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../../../../global/components/shared/TextField";
import Button from "../../../../global/components/ui/Button";
import { ROUTES } from "../../../../routes/routes";

export default function RecoverPasswordContainer() {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(ROUTES.RESET_PASSWORD);
    };

    return (
        <>
            <Link
                to={ROUTES.LOGIN}
                className="self-start flex flex-row items-center gap-1 font-body-normal-regular font-bold text-primary-500"
            >
                <ChevronLeft size={20} />
                Volver a iniciar sesión
            </Link>

            <div className="w-full">
                <h3 className="text-neutral-900">Recuperar contraseña</h3>
                <p className="font-body-normal-regular text-neutral-600">
                    Ingresa tu correo electrónico registrado y te enviaremos un enlace seguro para restablecer tu acceso.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <TextField
                    label="Correo electrónico"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    tag={{ text: "Requerido", variant: "required" }}
                    placeholder="nombre@empresa.com"
                    leftIcon={<Mail />}
                />

                <Button type="submit" variant="primary" size="md">
                    Enviar enlace
                </Button>
            </form>

            <div className="w-full flex flex-row h-fit p-4 gap-3 bg-neutral-100 border border-neutral-300 rounded-xl">
                <CircleQuestionMark className="w-6 text-primary-500" />
                <div>
                    <p className="font-body-normal-medium text-neutral-900 text-xs">
                        ¿No recuerdas tu correo corporativo?
                    </p>
                    <p className="font-body-normal-medium text-neutral-450 text-xs">
                        Comunícate con el Administrador Financiero de tu organización o con nuestro canal de soporte 24/7.
                    </p>
                </div>
            </div>
        </>
    );
}