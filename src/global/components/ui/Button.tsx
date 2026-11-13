import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export type ButtonVariant = "primary" | "secondary" | "red";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    children: ReactNode;
}

const base =
    "inline-flex items-center justify-center gap-2 border select-none cursor-pointer " +
    "tracking-[-0.5px] transition-all duration-150 focus:outline-none " +
    "disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-300 " +
    "disabled:border-transparent";

const sizes: Record<ButtonSize, string> = {
    sm: "px-2.5 py-2.5 min-w-[61px] rounded-xl text-[14px] font-medium leading-[130%]",
    md: "px-4 py-3 min-w-[80px] rounded-xl text-[16px] font-semibold leading-[130%]",
    lg: "px-4 py-[16.5px] min-w-[86px] rounded-[14px] text-[18px] font-medium leading-[130%]",
};

const variants: Record<ButtonVariant, string> = {
    primary:
        "border-transparent bg-primary-500 text-neutral-50 " +
        "hover:bg-primary-900 " +
        "active:bg-primary-50 active:text-primary-500 active:ring-2 active:ring-primary-500 " +
        "focus-visible:bg-primary-50 focus-visible:text-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500",

    secondary:
        "border-neutral-200 bg-neutral-50 text-neutral-900 " +
        "hover:border-neutral-900 hover:bg-neutral-900 hover:text-neutral-50 " +
        "active:border-neutral-900 active:bg-neutral-900 active:text-neutral-50 active:ring-2 active:ring-neutral-300 active:ring-offset-2 " +
        "focus-visible:border-neutral-900 focus-visible:bg-neutral-900 focus-visible:text-neutral-50 focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2",

    red:
        "border-transparent bg-red-100 text-red-500 " +
        "hover:bg-red-200 hover:text-neutral-50 " +
        "active:bg-red-500 active:text-neutral-50 active:ring-2 active:ring-red-200 active:ring-offset-2 " +
        "focus-visible:bg-red-500 focus-visible:text-neutral-50 focus-visible:ring-2 focus-visible:ring-red-200 focus-visible:ring-offset-2",
};

const Button = ({
    variant = "primary",
    size = "md",
    fullWidth = false,
    type = "button",
    className,
    children,
    ...props
}: ButtonProps) => (
    <button
        type={type}
        className={cn(base, sizes[size], variants[variant], fullWidth && "w-full", className)}
        {...props}
    >
        {children}
    </button>
);

export default Button;