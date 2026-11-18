import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../utils/cn";

interface InfoCardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export default function InfoCard({ className, children, ...props }: InfoCardProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-100 px-3 py-2",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}