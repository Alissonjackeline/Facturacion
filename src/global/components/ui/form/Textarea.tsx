import { forwardRef, useId, useState } from "react";
import clsx from "clsx";
import Label from "./Label";
import ContainerInput from "../../shared/ContainerInput";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    tag?: React.ComponentProps<typeof Label>["tag"];
    error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        { label, tag, error, disabled, maxLength, rows = 4, className, id, onChange, value, defaultValue, ...props },
        ref
    ) => {
        const autoId = useId();
        const inputId = id ?? autoId;

        const [count, setCount] = useState(String(defaultValue ?? "").length);
        const length = value !== undefined ? String(value).length : count;
        const limitReached = maxLength !== undefined && length >= maxLength;

        return (
            <div className="w-full">
                {(label || maxLength !== undefined) && (
                    <div className="flex items-end justify-between gap-3">
                        {label ? (
                            <Label label={label} htmlFor={inputId} tag={tag} disabled={disabled} />
                        ) : (
                            <span />
                        )}
                        {maxLength !== undefined && (
                            <span
                                className={clsx(
                                    "pb-1 font-body-small-regular",
                                    limitReached ? "text-red-500" : "text-neutral-300"
                                )}
                            >
                                {length} / {maxLength} car.
                            </span>
                        )}
                    </div>
                )}

                <ContainerInput
                    error={error}
                    disabled={disabled}
                    className="h-auto! items-start py-3"
                >
                    <textarea
                        ref={ref}
                        id={inputId}
                        rows={rows}
                        maxLength={maxLength}
                        disabled={disabled}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={(e) => {
                            setCount(e.target.value.length);
                            onChange?.(e);
                        }}
                        className={clsx(
                            "w-full min-w-0 resize-none border-none bg-transparent outline-none",
                            "font-form-normal text-neutral-900 placeholder:text-neutral-300",
                            "disabled:cursor-not-allowed disabled:text-neutral-300",
                            className
                        )}
                        {...props}
                    />
                </ContainerInput>
            </div>
        );
    }
);

Textarea.displayName = "Textarea";
export default Textarea;