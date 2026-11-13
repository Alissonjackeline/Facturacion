import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import Label from "./Label";
import ContainerInput from "../../shared/ContainerInput";
import DropdownMenu, { type DropdownOption } from "../../shared/DropdownMenu";

export type SelectOption = DropdownOption;

interface SelectProps {
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    label?: string;
    tag?: React.ComponentProps<typeof Label>["tag"];
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    leftIcon?: React.ReactNode;
    className?: string;
}

export default function Select({
    options,
    value,
    onChange,
    onBlur,
    label,
    tag,
    placeholder = "Selecciona una opción",
    error,
    disabled,
    leftIcon,
    className,
}: SelectProps) {
    const id = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(-1);

    const selected = options.find((o) => o.value === value);

    const close = () => {
        setOpen(false);
        setActive(-1);
    };

    const select = (option: SelectOption) => {
        if (option.disabled) return;
        onChange?.(option.value);
        close();
    };

    // Cerrar al hacer clic fuera
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) close();
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const move = (dir: 1 | -1) => {
        if (!options.length) return;
        let next = active;
        for (let i = 0; i < options.length; i++) {
            next = (next + dir + options.length) % options.length;
            if (!options[next].disabled) break;
        }
        setActive(next);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                if (!open) setOpen(true);
                move(1);
                break;
            case "ArrowUp":
                e.preventDefault();
                if (!open) setOpen(true);
                move(-1);
                break;
            case "Enter":
            case " ":
                e.preventDefault();
                if (open && active >= 0) select(options[active]);
                else setOpen((o) => !o);
                break;
            case "Escape":
                close();
                break;
        }
    };

    return (
        <div ref={rootRef} className={clsx("relative w-full", className)}>
            {label && <Label label={label} htmlFor={id} tag={tag} disabled={disabled} />}

            <ContainerInput
                error={error}
                disabled={disabled}
                leftIcon={leftIcon}
                rightIcon={
                    <ChevronDown
                        className={clsx("transition-transform duration-200", open && "rotate-180")}
                    />
                }
                className={clsx(!disabled && "cursor-pointer", open && "border-blue-500!")}
            >
                <button
                    id={id}
                    type="button"
                    role="combobox"
                    aria-expanded={open}
                    aria-haspopup="listbox"
                    disabled={disabled}
                    onClick={() => setOpen((o) => !o)}
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    className={clsx(
                        "min-w-0 flex-1 truncate text-left font-form-normal outline-none",
                        "disabled:cursor-not-allowed",
                        selected ? "text-neutral-900" : "text-neutral-300"
                    )}
                >
                    {selected ? selected.label : placeholder}
                </button>
            </ContainerInput>

            {open && !disabled && (
                <DropdownMenu
                    options={options}
                    isSelected={(o) => o.value === value}
                    activeIndex={active}
                    onActiveChange={setActive}
                    onSelect={select}
                />
            )}
        </div>
    );
}