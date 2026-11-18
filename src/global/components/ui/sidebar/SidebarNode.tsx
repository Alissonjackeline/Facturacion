import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { isItemActive, type NavItem } from "./sidebar.config";

type Props = { item: NavItem; level: 1 | 2 | 3; pathname: string };

const BASE = "w-full flex items-center gap-3 rounded-lg transition-colors";
const SIZE = {
    1: "h-11 px-3 text-sm font-medium",
    2: "h-10 px-3 text-sm",
    3: "h-9 px-3 text-[13px]",
} as const;

export default function SidebarNode({ item, level, pathname }: Props) {
    const active = isItemActive(item, pathname);
    const [open, setOpen] = useState(active);
    const Icon = item.icon;

    useEffect(() => {
        if (active) setOpen(true);
    }, [active]);

    const dotSize = level === 3 ? "size-1" : "size-1.5";

    if (!item.children) {
        return (
            <NavLink
                to={item.to!}
                end
                className={({ isActive }) =>
                    `${BASE} ${SIZE[level]} ${isActive
                        ? "bg-primary-50 text-primary-500 font-medium"
                        : "text-neutral-450 hover:bg-neutral-100"
                    }`
                }
            >
                {({ isActive }) => (
                    <>
                        <span
                            className={`shrink-0 rounded-full ${dotSize} ${isActive ? "bg-primary-500" : "bg-neutral-200"
                                }`}
                        />
                        <span className="flex-1 truncate">{item.label}</span>
                        {level === 2 && isActive && (
                            <span className="size-2 rounded-full bg-primary-500" />
                        )}
                    </>
                )}
            </NavLink>
        );
    }

    return (
        <div>
            <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className={`${BASE} ${SIZE[level]} cursor-pointer ${level === 1 && active
                    ? "bg-primary-50 text-primary-500"
                    : "text-neutral-900 hover:bg-neutral-100"
                    }`}
            >
                {Icon ? (
                    <Icon className="size-5 shrink-0" />
                ) : (
                    <span className={`shrink-0 rounded-full ${dotSize} bg-neutral-900`} />
                )}
                <span className="flex-1 truncate text-left">{item.label}</span>
                <ChevronDown
                    className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className={`overflow-hidden border-l border-neutral-200 ${level === 1 ? "ml-5" : "ml-4"
                            }`}
                    >
                        <div className="mt-1 flex flex-col gap-0.5 pl-3">
                            {item.children.map((child) => (
                                <SidebarNode
                                    key={child.id}
                                    item={child}
                                    level={(level + 1) as 2 | 3}
                                    pathname={pathname}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}