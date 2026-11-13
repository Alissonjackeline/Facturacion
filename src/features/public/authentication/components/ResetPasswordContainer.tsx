import { Eye, EyeOff, Lock } from "lucide-react";
import TextField from "../../../../global/components/shared/TextField";
import Button from "../../../../global/components/ui/Button";
import { useState } from "react";

export default function ResetPasswordContainer() {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className="w-full">
                <h3 className="text-neutral-900">Restablecer contraseña</h3>
                <p className="font-body-normal-regular text-neutral-600">
                    Crea una contraseña segura para proteger tus comprobantes y transacciones.
                </p>
            </div>

            <form className="w-full flex flex-col gap-4">
                <TextField
                    label="Nueva contraseña"
                    type={show ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
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
                <div className="w-full rounded-2xl bg-neutral-100 p-3.5">
                    <p></p>

                </div>

                <TextField
                    label="Confirmar contraseña"
                    type={show ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
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

                <Button type="submit" variant="primary" size="md">
                    Restablecer y acceder
                </Button>
            </form>
        </>
    )
}
