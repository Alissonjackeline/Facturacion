import { forwardRef } from "react";
import clsx from "clsx";

interface RadioProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
    label?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
    ({ label, className, disabled, ...props }, ref) => (
        <label
            className={clsx(
                "inline-flex items-center gap-3 select-none",
                disabled ? "cursor-not-allowed" : "cursor-pointer",
                className
            )}
        >
            <input ref={ref} type="radio" disabled={disabled} className="peer sr-only" {...props} />

            <span
                className={clsx(
                    "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    "border-neutral-200 bg-neutral-50",
                    "peer-checked:border-primary-500",
                    "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2",
                    "peer-disabled:border-neutral-200 peer-disabled:bg-neutral-100",
                    "peer-checked:peer-disabled:border-primary-200",
                    "after:size-2.5 after:rounded-full after:bg-transparent after:transition-colors",
                    "peer-checked:after:bg-primary-500",
                    "peer-checked:peer-disabled:after:bg-primary-200"
                )}
            />

            {label && (
                <span className="font-form-normal text-neutral-900 peer-disabled:text-neutral-300">
                    {label}
                </span>
            )}
        </label>
    )
);

Radio.displayName = "Radio";
export default Radio;