import type { ReactNode } from "react";
import { Tag } from "../Tag";

type TagProps = React.ComponentProps<typeof Tag>;

interface LabelProps {
    label: string;
    htmlFor?: string;
    tag?: { text: ReactNode } & Omit<TagProps, "children">;
    disabled?: boolean;
}

const Label = ({ label, htmlFor, tag, disabled }: LabelProps) => (
    <div className="flex justify-between gap-1.5 pb-1">
        <label
            htmlFor={htmlFor}
            className={`font-body-normal-medium font-semibold! ${disabled ? "text-neutral-300" : "text-neutral-900"
                }`}
        >
            {label}
        </label>
        {tag && <Tag {...tag}>{tag.text}</Tag>}
    </div>
);

export default Label;