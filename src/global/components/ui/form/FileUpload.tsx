import { useId, useRef, useState } from "react";
import { CloudUpload, FileText, X } from "lucide-react";
import clsx from "clsx";
import Label from "./Label";

interface FileUploadProps {
    label?: string;
    tag?: React.ComponentProps<typeof Label>["tag"];
    accept?: string;
    maxSizeMB?: number;
    multiple?: boolean;
    disabled?: boolean;
    error?: string;
    helperText?: string;
    onChange?: (files: File[]) => void;
    className?: string;
}

const formatSize = (bytes: number) =>
    bytes < 1024 * 1024
        ? `${(bytes / 1024).toFixed(0)} KB`
        : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

export default function FileUpload({
    label,
    tag,
    accept,
    maxSizeMB,
    multiple = false,
    disabled,
    error,
    helperText,
    onChange,
    className,
}: FileUploadProps) {
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [dragging, setDragging] = useState(false);
    const [localError, setLocalError] = useState<string>();

    const allowed = accept
        ?.split(",")
        .map((e) => e.trim().toLowerCase())
        .filter((e) => e.startsWith("."));

    const validate = (file: File): string | undefined => {
        if (allowed?.length && !allowed.some((ext) => file.name.toLowerCase().endsWith(ext))) {
            return `"${file.name}" no es un formato permitido (${allowed.join(", ")}).`;
        }
        if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
            return `"${file.name}" supera el máximo de ${maxSizeMB} MB.`;
        }
    };

    const handleFiles = (incoming: FileList | File[]) => {
        const list = Array.from(incoming);
        const valid: File[] = [];
        let firstError: string | undefined;

        for (const file of list) {
            const err = validate(file);
            if (err) firstError ??= err;
            else valid.push(file);
        }

        setLocalError(firstError);
        if (!valid.length) return;

        const next = multiple ? [...files, ...valid] : [valid[0]];
        setFiles(next);
        onChange?.(next);
    };

    const removeFile = (index: number) => {
        const next = files.filter((_, i) => i !== index);
        setFiles(next);
        setLocalError(undefined);
        onChange?.(next);
        if (inputRef.current) inputRef.current.value = "";
    };

    const open = () => !disabled && inputRef.current?.click();
    const message = error ?? localError;

    return (
        <div className={clsx("w-full", className)}>
            {label && <Label label={label} htmlFor={id} tag={tag} disabled={disabled} />}

            <div
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-disabled={disabled}
                onClick={open}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        open();
                    }
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    if (!disabled) setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    if (!disabled) handleFiles(e.dataTransfer.files);
                }}
                className={clsx(
                    "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors outline-none",
                    "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                    disabled
                        ? "cursor-not-allowed border-neutral-200 bg-neutral-50 opacity-60"
                        : "cursor-pointer",
                    !disabled && dragging && "border-primary-500 bg-primary-50",
                    !disabled && !dragging && (message
                        ? "border-red-500 bg-neutral-50"
                        : "border-neutral-200 bg-neutral-50 hover:border-neutral-300")
                )}
            >
                <input
                    ref={inputRef}
                    id={id}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    disabled={disabled}
                    className="sr-only"
                    tabIndex={-1}
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                />

                <CloudUpload className="size-7 text-neutral-450" />

                <p className="font-body-small-regular text-neutral-900">
                    Arrastre el archivo aquí o{" "}
                    <span className="font-link-small text-[14px]! text-primary-500">
                        Seleccionar archivo
                    </span>
                </p>

                {helperText && (
                    <p className="font-body-extrasmall-regular text-neutral-300">{helperText}</p>
                )}
            </div>

            {files.length > 0 && (
                <ul className="mt-2 flex flex-col gap-2">
                    {files.map((file, i) => (
                        <li
                            key={`${file.name}-${i}`}
                            className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-primary-50 px-3 py-2"
                        >
                            <FileText className="size-5 shrink-0 text-primary-500" />
                            <span className="min-w-0 flex-1 truncate font-body-small-medium text-neutral-900">
                                {file.name}
                            </span>
                            <span className="shrink-0 font-body-extrasmall-regular text-neutral-300">
                                {formatSize(file.size)}
                            </span>
                            {!disabled && (
                                <button
                                    type="button"
                                    aria-label={`Quitar ${file.name}`}
                                    onClick={() => removeFile(i)}
                                    className="rounded-full p-1 text-neutral-300 hover:bg-neutral-100 hover:text-neutral-900"
                                >
                                    <X className="size-4" />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {message && (
                <p className="mt-1 font-body-extrasmall-regular !leading-[130%] text-red-500">
                    {message}
                </p>
            )}
        </div>
    );
}