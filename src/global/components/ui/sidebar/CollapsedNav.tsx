import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    countLeaves,
    isItemActive,
    NAV_ITEMS,
    type NavItem,
} from "./sidebar.config";
import { Tag } from "../Tag";

type Flyout = { item: NavItem; top: number } | null;

export default function CollapsedNav({ pathname }: { pathname: string }) {
    const [flyout, setFlyout] = useState<Flyout>(null);
    const timer = useRef<number | undefined>(undefined);

    const cancelClose = () => window.clearTimeout(timer.current);
    const show = (item: NavItem, el: HTMLElement) => {
        cancelClose();
        setFlyout({ item, top: el.getBoundingClientRect().top });
    };
    const scheduleClose = () => {
        cancelClose();
        timer.current = window.setTimeout(() => setFlyout(null), 120);
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFlyout(null);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    useEffect(() => setFlyout(null), [pathname]);

    return (
        <>
            <nav className="flex flex-col items-center gap-2">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon!;
                    const active = isItemActive(item, pathname);
                    return (
                        <button
                            key={item.id}
                            type="button"
                            aria-label={item.label}
                            onMouseEnter={(e) => show(item, e.currentTarget)}
                            onMouseLeave={scheduleClose}
                            onFocus={(e) => show(item, e.currentTarget)}
                            onClick={(e) => show(item, e.currentTarget)}
                            className={`relative size-10 grid place-items-center rounded-lg transition-colors ${active
                                ? "bg-neutral-100 text-primary-500"
                                : "text-neutral-600 hover:bg-neutral-50"
                                }`}
                        >
                            {active && (
                                <span className="absolute -left-3 top-2 bottom-2 w-0.5 rounded-full bg-primary-500" />
                            )}
                            <Icon className="size-5" />
                        </button>
                    );
                })}
            </nav>

            {flyout && (
                <div
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                    style={{ top: flyout.top }}
                    className="fixed left-20 z-50 w-64 rounded-xl border border-neutral-100 bg-white p-4 shadow-lg"
                >
                    <div className="mb-3 flex items-center gap-2">
                        {flyout.item.icon && (
                            <flyout.item.icon className="size-4 text-primary-500" />
                        )}
                        <span className="f0lex-1 text-xs font-semibold uppercase tracking-wide text-neutral-900">
                            {flyout.item.label}
                        </span>
                        <Tag variant="primary" styleType="soft">{countLeaves(flyout.item)} opciones</Tag>
                    </div>

                    <div className="flex flex-col gap-0.5">
                        {flyout.item.children?.map((child) =>
                            child.children ? (
                                <div key={child.id} className="mt-1">
                                    <p className="px-3 py-1 text-xs font-medium text-neutral-900">
                                        {child.label}
                                    </p>
                                    {child.children.map((leaf) => (
                                        <FlyoutLink key={leaf.id} item={leaf} indent />
                                    ))}
                                </div>
                            ) : (
                                <FlyoutLink key={child.id} item={child} />
                            )
                        )}
                    </div>

                    <div className="mt-3 flex justify-between border-t border-neutral-100 pt-3 text-[11px]">
                        <span className="text-neutral-600">Navegación contextual</span>
                        <span className="text-primary-500">Esc para cerrar</span>
                    </div>
                </div>
            )}
        </>
    );
}

function FlyoutLink({ item, indent }: { item: NavItem; indent?: boolean }) {
    return (
        <NavLink
            to={item.to!}
            end
            className={({ isActive }) =>
                `flex h-9 items-center gap-3 rounded-lg px-3 text-[13px] transition-colors ${indent ? "ml-3" : ""
                } ${isActive
                    ? "bg-neutral-100 font-medium text-primary-500"
                    : "text-neutral-600 hover:bg-neutral-50"
                }`
            }
        >
            <span className="size-1 shrink-0 rounded-full bg-current opacity-60" />
            {item.label}
        </NavLink>
    );
}