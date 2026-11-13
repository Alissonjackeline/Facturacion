import type { ReactNode } from "react";

type TagVariant =
    | "primary"
    | "required"
    | "success"
    | "optional"
    | "info"
    | "warning";
type TagSize = "sm" | "md" | "lg";
type TagStyle = "solid" | "soft" | "outline";

interface TagProps {
    variant?: TagVariant;
    size?: TagSize;
    styleType?: TagStyle;
    className?: string;
    children: ReactNode;
}

const styles: Record<TagStyle, Record<TagVariant, string>> = {
    solid: {
        primary: "bg-primary-500 text-neutral-50",
        required: "bg-red-500 text-neutral-50",
        success: "bg-green-600 text-neutral-50",
        optional: "bg-neutral-450 text-neutral-50",
        info: "bg-blue-500 text-neutral-50",
        warning: "bg-orange-500 text-neutral-50",
    },
    soft: {
        primary: "bg-primary-100 text-primary-700",
        required: "bg-red-100 text-red-800",
        success: "bg-green-100 text-green-800",
        optional: "bg-neutral-200 text-neutral-450",
        info: "bg-blue-100 text-blue-800",
        warning: "bg-orange-100 text-orange-900",
    },
    outline: {
        primary: "border border-primary-500 text-primary-600 bg-neutral-50",
        required: "border border-red-500 text-red-500 bg-neutral-50",
        success: "border border-green-500 text-green-800 bg-neutral-50",
        optional: "border border-neutral-300 text-neutral-450 bg-neutral-50",
        info: "border border-blue-500 text-blue-500 bg-neutral-50",
        warning: "border border-orange-500 text-orange-900 bg-neutral-50",
    },
};

const sizes: Record<TagSize, string> = {
    sm: "h-[18px] px-1.5 font-body-extrasmall-medium",
    md: "h-[22px] px-2 font-body-small-medium",
    lg: "h-7 px-3 font-body-normal-medium",
};

export const Tag = ({
    variant = "info",
    size = "md",
    styleType = "solid",
    className = "",
    children,
}: TagProps) => (
    <span
        className={`inline-flex w-fit items-center whitespace-nowrap rounded-full ${sizes[size]} ${styles[styleType][variant]} ${className}`}
    >
        {children}
    </span>
);