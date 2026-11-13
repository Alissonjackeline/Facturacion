import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

export interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

const itemBase =
    "inline-flex items-center gap-1.5 font-body-normal-regular transition-colors rounded-md outline-none focus-visible:ring-2 focus-visible:ring-blue-500";

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className={className}>
            <ol className="flex flex-wrap items-center gap-2">
                {items.map((item, i) => {
                    const isLast = i === items.length - 1;
                    const content = (
                        <>
                            {item.icon && (
                                <span className="flex shrink-0 items-center [&_svg]:size-4">
                                    {item.icon}
                                </span>
                            )}
                            <span>{item.label}</span>
                        </>
                    );

                    return (
                        <Fragment key={`${item.label}-${i}`}>
                            <li className="flex items-center">
                                {isLast ? (
                                    <span
                                        aria-current="page"
                                        className={clsx(itemBase, "font-semibold! text-primary-500")}
                                    >
                                        {content}
                                    </span>
                                ) : item.href ? (
                                    <a
                                        href={item.href}
                                        onClick={item.onClick}
                                        className={clsx(itemBase, "text-neutral-450 hover:text-neutral-900")}
                                    >
                                        {content}
                                    </a>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={item.onClick}
                                        className={clsx(itemBase, "text-neutral-450 hover:text-neutral-900")}
                                    >
                                        {content}
                                    </button>
                                )}
                            </li>

                            {!isLast && (
                                <li aria-hidden="true" className="flex items-center text-neutral-300">
                                    <ChevronRight className="size-4" />
                                </li>
                            )}
                        </Fragment>
                    );
                })}
            </ol>
        </nav>
    );
}