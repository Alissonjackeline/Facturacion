import type { ReactNode } from "react";

export interface TabItem {
    id: string;
    label: string;
    count?: number;
    icon?: ReactNode;
}

interface TabsHorizontalProps {
    tabs: TabItem[];
    activeId: string;
    onChange: (id: string) => void;
    className?: string;
}

export const TabsHorizontal = ({
    tabs,
    activeId,
    onChange,
    className = "",
}: TabsHorizontalProps) => {
    return (
        <div
            role="tablist"
            className={`flex gap-8 overflow-x-auto border-b border-neutral-200 ${className}`}
        >
            {tabs.map(({ id, label, count, icon }) => {
                const isActive = id === activeId;

                return (
                    <button
                        key={id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onChange(id)}
                        className={`relative -mb-px flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap pb-3 font-body-normal-medium transition-colors ${isActive
                            ? "text-primary-500"
                            : "text-neutral-450 hover:text-neutral-500"
                            }`}
                    >
                        {icon && <span className="flex size-5 items-center">{icon}</span>}
                        <span>
                            {label}
                            {count !== undefined && ` (${count.toLocaleString("en-US")})`}
                        </span>

                        {isActive && (
                            <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary-500" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};