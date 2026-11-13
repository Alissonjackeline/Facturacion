import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", disabled, ...props }, ref) => (
        <input
            ref={ref}
            disabled={disabled}
            className={`input-no-autofill w-full min-w-0 bg-transparent border-none outline-none
        font-form-normal text-neutral-900
        placeholder:text-neutral-300
        disabled:cursor-not-allowed disabled:text-neutral-300
        ${className}`}
            {...props}
        />
    )
);

Input.displayName = "Input";
export default Input;