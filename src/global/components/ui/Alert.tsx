import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react";

export type AlertVariant = "success" | "warning" | "error" | "info";

interface AlertProps {
    variant?: AlertVariant;
    title?: string;
    onClose?: () => void;
    className?: string;
    children?: ReactNode;
}

interface VariantStyle {
    Icon: LucideIcon;
    container: string;
    icon: string;
    title: string;
    text: string;
    close: string;
}

const variants: Record<AlertVariant, VariantStyle> = {
    success: {
        Icon: CircleCheck,
        container: "border-green-500 bg-green-50",
        icon: "text-green-500",
        title: "text-neutral-900",
        text: "text-green-900",
        close: "text-green-900",
    },
    warning: {
        Icon: TriangleAlert,
        container: "border-orange-500 bg-orange-50",
        icon: "text-orange-800",
        title: "text-orange-800",
        text: "text-orange-900",
        close: "text-orange-900",
    },
    error: {
        Icon: CircleAlert,
        container: "border-red-500 bg-red-50",
        icon: "text-red-500",
        title: "text-red-500",
        text: "text-red-800",
        close: "text-red-900",
    },
    info: {
        Icon: Info,
        container: "border-blue-500 bg-blue-50",
        icon: "text-blue-500",
        title: "text-blue-900",
        text: "text-blue-900",
        close: "text-blue-900",
    },
};

const Alert = ({
    variant = "info",
    title,
    onClose,
    className = "",
    children,
}: AlertProps) => {
    const { Icon, container, icon, title: titleColor, text, close } = variants[variant];

    return (
        <div
            role={variant === "error" || variant === "warning" ? "alert" : "status"}
            className={`flex w-full flex-row items-start justify-between gap-3 rounded-xl border p-3 ${container} ${className}`}
        >
            <div className="flex flex-1 flex-row gap-2">
                <Icon className={`size-5 shrink-0 ${icon}`} aria-hidden />

                <div className="flex flex-col gap-1">
                    {title && (
                        <p className={`font-body-normal-medium font-extrabold ${titleColor}`}>{title}</p>
                    )}
                    {children && (
                        <div className={`font-form-small ${text}`}>{children}</div>
                    )}
                </div>
            </div>

            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Cerrar alerta"
                    className={`shrink-0 cursor-pointer rounded-md p-1 hover:bg-neutral-900/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-current ${close}`}
                >
                    <X className="size-4" />
                </button>
            )}
        </div>
    );
};

export default Alert;