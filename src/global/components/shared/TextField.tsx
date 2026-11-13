import { forwardRef, useId } from "react";
import type { ReactNode } from "react";
import Label from "../ui/form/Label";
import ContainerInput from "./ContainerInput";
import Input from "../ui/form/Input";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    tag?: React.ComponentProps<typeof Label>["tag"];
    error?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    ({ label, tag, error, leftIcon, rightIcon, disabled, id, ...props }, ref) => {
        const autoId = useId();
        const inputId = id ?? autoId;

        return (
            <div className="w-full">
                {label && <Label label={label} htmlFor={inputId} tag={tag} disabled={disabled} />}
                <ContainerInput
                    error={error}
                    disabled={disabled}
                    leftIcon={leftIcon}
                    rightIcon={rightIcon}
                >
                    <Input id={inputId} ref={ref} disabled={disabled} {...props} />
                </ContainerInput>
            </div>
        );
    }
);

TextField.displayName = "TextField";
export default TextField;