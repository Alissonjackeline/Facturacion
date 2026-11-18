import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../../utils/cn";

type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    size?: IconButtonSize;
    children: ReactNode;
}

const sizes: Record<IconButtonSize, string> = {
    sm: "size-8 [&>svg]:size-4",
    md: "size-9 [&>svg]:size-5",
    lg: "size-10 [&>svg]:size-5",
};

export default function IconButton({
    label,
    size = "md",
    type = "button",
    className,
    children,
    ...props
}: IconButtonProps) {
    return (
        <button
            type={type}
            aria-label={label}
            className={cn(
                "shrink-0 grid place-items-center rounded-lg cursor-pointer transition-colors",
                "text-neutral-600 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-primary-500 focus:outline-none",
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}