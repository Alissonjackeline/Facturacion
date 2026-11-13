import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import clsx from "clsx";
import Label from "./Label";
import ContainerInput from "../../shared/ContainerInput";
import { Tag } from "../Tag";
import type { DropdownOption } from "../../shared/DropdownMenu";
import DropdownMenu from "../../shared/DropdownMenu";

export type MultiSelectOption = DropdownOption;

interface MultiSelectProps {
    options: MultiSelectOption[];
    value?: string[];
    onChange?: (values: string[]) => void;
    onBlur?: () => void;
    label?: string;
    tag?: React.ComponentProps<typeof Label>["tag"];
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    leftIcon?: React.ReactNode;
    maxSelected?: number;
    className?: string;
}

export default function MultiSelect({
    options,
    value = [],
    onChange,
    onBlur,
    label,
    tag,
    placeholder = "Selecciona una o más opciones",
    error,
    disabled,
    leftIcon,
    maxSelected,
    className,
}: MultiSelectProps) {
    const id = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(-1);

    const selectedOptions = options.filter((o) => value.includes(o.value));
    const limitReached = maxSelected !== undefined && value.length >= maxSelected;

    const close = () => {
        setOpen(false);
        setActive(-1);
    };

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) close();
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const toggle = (option: MultiSelectOption) => {
        if (option.disabled) return;
        const isSelected = value.includes(option.value);
        if (!isSelected && limitReached) return;
        onChange?.(
            isSelected ? value.filter((v) => v !== option.value) : [...value, option.value]
        );
    };

    const remove = (val: string) => onChange?.(value.filter((v) => v !== val));

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
                if (open && active >= 0) toggle(options[active]);
                else setOpen((o) => !o);
                break;
            case "Backspace":
                if (value.length) remove(value[value.length - 1]);
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
                className={clsx(
                    "h-auto! min-h-[42px] py-1.5",
                    !disabled && "cursor-pointer",
                    open && "border-blue-500!"
                )}
            >
                <div
                    id={id}
                    role="combobox"
                    aria-expanded={open}
                    aria-haspopup="listbox"
                    aria-disabled={disabled}
                    tabIndex={disabled ? -1 : 0}
                    onClick={() => !disabled && setOpen((o) => !o)}
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5 outline-none"
                >
                    {selectedOptions.length === 0 ? (
                        <span className="font-form-normal text-neutral-300">{placeholder}</span>
                    ) : (
                        selectedOptions.map((o) => (
                            <Tag
                                key={o.value}
                                variant="primary"
                                styleType="soft"
                                className="max-w-full gap-1 pr-1!"
                            >
                                <span className="truncate">{o.label}</span>
                                {!disabled && (
                                    <button
                                        type="button"
                                        aria-label={`Quitar ${o.label}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            remove(o.value);
                                        }}
                                        className="rounded-full p-0.5 hover:bg-primary-200"
                                    >
                                        <X className="size-3" />
                                    </button>
                                )}
                            </Tag>
                        ))
                    )}
                </div>
            </ContainerInput>

            {open && !disabled && (
                <DropdownMenu
                    multiple
                    options={options}
                    isSelected={(o) => value.includes(o.value)}
                    isBlocked={(o) => !value.includes(o.value) && limitReached}
                    activeIndex={active}
                    onActiveChange={setActive}
                    onSelect={toggle}
                />
            )}
        </div>
    );
}