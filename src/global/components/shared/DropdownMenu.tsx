import { Check } from "lucide-react";
import clsx from "clsx";

export interface DropdownOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface DropdownMenuProps {
    options: DropdownOption[];
    isSelected: (option: DropdownOption) => boolean;
    isBlocked?: (option: DropdownOption) => boolean;
    multiple?: boolean;
    activeIndex: number;
    onActiveChange: (index: number) => void;
    onSelect: (option: DropdownOption) => void;
    emptyMessage?: string;
    className?: string;
}

export default function DropdownMenu({
    options,
    isSelected,
    isBlocked,
    multiple = false,
    activeIndex,
    onActiveChange,
    onSelect,
    emptyMessage = "No hay opciones disponibles",
    className,
}: DropdownMenuProps) {
    return (
        <ul
            role="listbox"
            aria-multiselectable={multiple || undefined}
            className={clsx(
                "absolute z-50 mt-1 flex max-h-60 w-full flex-col gap-1 overflow-y-auto rounded-xl border border-neutral-200 bg-neutral-50 p-1 shadow-lg",
                className
            )}
        >
            {options.length === 0 ? (
                <li className="px-3 py-2.5 font-body-small-regular text-neutral-300">
                    {emptyMessage}
                </li>
            ) : (
                options.map((option, i) => {
                    const selected = isSelected(option);
                    const blocked = !!option.disabled || !!isBlocked?.(option);

                    return (
                        <li
                            key={option.value}
                            role="option"
                            aria-selected={selected}
                            aria-disabled={blocked}
                            onMouseEnter={() => !blocked && onActiveChange(i)}
                            onClick={() => !blocked && onSelect(option)}
                            className={clsx(
                                "flex items-center gap-2.5 rounded-lg px-3 py-2 font-form-normal transition-colors",
                                blocked
                                    ? "cursor-not-allowed text-neutral-300"
                                    : "cursor-pointer text-neutral-900",
                                !blocked && (selected || activeIndex === i) && "bg-primary-50",
                                !blocked && selected && "font-semibold! text-primary-500!"
                            )}
                        >
                            {multiple && (
                                <span
                                    className={clsx(
                                        "flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
                                        selected
                                            ? "border-primary-500 bg-primary-500 text-neutral-50"
                                            : "border-neutral-200 bg-neutral-50"
                                    )}
                                >
                                    {selected && <Check className="size-3" strokeWidth={3} />}
                                </span>
                            )}

                            <span className="flex-1 truncate">{option.label}</span>

                            {!multiple && selected && (
                                <Check className="size-4 shrink-0 text-primary-500" />
                            )}
                        </li>
                    );
                })
            )}
        </ul>
    );
}