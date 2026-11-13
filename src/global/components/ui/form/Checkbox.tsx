import { forwardRef } from "react";
import { Check } from "lucide-react";
import clsx from "clsx";

interface CheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
    label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, className, disabled, ...props }, ref) => (
        <label
            className={clsx(
                "inline-flex items-center gap-3 select-none",
                disabled ? "cursor-not-allowed" : "cursor-pointer",
                className
            )}
        >
            <input ref={ref} type="checkbox" disabled={disabled} className="peer sr-only" {...props} />

            <span
                className={clsx(
                    "flex size-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                    "border-neutral-200 bg-neutral-50 text-transparent",
                    "peer-checked:border-primary-500 peer-checked:bg-primary-500 peer-checked:text-neutral-50",
                    "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2",
                    "peer-disabled:border-neutral-200 peer-disabled:bg-neutral-100",
                    "peer-checked:peer-disabled:border-primary-100 peer-checked:peer-disabled:bg-primary-100"
                )}
            >
                <Check className="size-4" strokeWidth={3} />
            </span>

            {label && (
                <span className="font-form-normal text-neutral-900 peer-disabled:text-neutral-300">
                    {label}
                </span>
            )}
        </label>
    )
);

Checkbox.displayName = "Checkbox";
export default Checkbox;