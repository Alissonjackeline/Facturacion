import clsx from "clsx";
import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";

interface ContainerInputProps {
    children: ReactNode;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    error?: string;
    disabled?: boolean;
    className?: string;
}

const iconSlot = "flex shrink-0 items-center text-neutral-300 [&_svg]:size-5";

const ContainerInput = ({
    children,
    leftIcon,
    rightIcon,
    error,
    disabled,
    className,
}: ContainerInputProps) => (
    <div className="w-full">
        <div
            className={clsx(
                "flex h-[42px] items-center gap-2 rounded-xl border px-3.5 transition-colors",
                disabled
                    ? "cursor-not-allowed border-neutral-200 bg-neutral-100"
                    : [
                        "bg-neutral-50",
                        error
                            ? "border-red-500"
                            : "border-neutral-200 hover:border-neutral-300 focus-within:!border-blue-500",
                    ],
                className
            )}
        >
            {leftIcon && <span className={iconSlot}>{leftIcon}</span>}

            {children}

            {error && !rightIcon ? (
                <span className={clsx(iconSlot, "!text-red-500")}>
                    <CircleAlert />
                </span>
            ) : (
                rightIcon && <span className={iconSlot}>{rightIcon}</span>
            )}
        </div>

        {error && (
            <p className="mt-1 font-body-extrasmall-regular !leading-[130%] text-red-500">
                {error}
            </p>
        )}
    </div>
);

export default ContainerInput;