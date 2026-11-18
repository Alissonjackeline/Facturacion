import type { ReactNode } from "react";

interface BrandLogoProps {
    title?: string;
    subtitle?: string;
    icon?: ReactNode;
    className?: string;
}

export default function BrandLogo({ title, subtitle, icon, className = "" }: BrandLogoProps) {
    return (
        <div className={`flex flex-row min-w-0 gap-2.5 ${title ? "w-full" : ""} ${className}`}>
            <div className="w-9 h-9 shrink-0 rounded-xl bg-primary-500 grid place-items-center text-white [&>svg]:size-5">
                {icon}
            </div>
            {title && (
                <div className="min-w-0">
                    <p className="font-body-large-regular font-bold text-neutral-900 truncate">{title}</p>
                    {subtitle && (
                        <p className="font-body-small-medium text-neutral-400 truncate">{subtitle}</p>
                    )}
                </div>
            )}
        </div>
    );
}