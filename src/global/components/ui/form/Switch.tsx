import { forwardRef } from "react";
import clsx from "clsx";

interface SwitchProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
    label?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    ({ label, className, disabled, ...props }, ref) => (
        <label
            className={clsx(
                "flex w-full items-center justify-between gap-3 select-none",
                disabled ? "cursor-not-allowed" : "cursor-pointer",
                className
            )}
        >
            {label && (
                <span className={clsx("font-form-normal", disabled ? "text-neutral-300" : "text-neutral-900")}>
                    {label}
                </span>
            )}

            <input ref={ref} type="checkbox" role="switch" disabled={disabled} className="peer sr-only" {...props} />

            <span
                className={clsx(
                    "relative h-7 w-13 shrink-0 rounded-full transition-colors",
                    "bg-neutral-200",
                    "peer-checked:bg-primary-500",
                    "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2",
                    "peer-disabled:bg-neutral-100",
                    "peer-checked:peer-disabled:bg-primary-100",
                    "after:absolute after:left-1 after:top-1 after:size-5 after:rounded-full",
                    "after:bg-neutral-50 after:shadow-sm after:transition-transform",
                    "peer-checked:after:translate-x-6"
                )}
            />
        </label>
    )
);

Switch.displayName = "Switch";
export default Switch;