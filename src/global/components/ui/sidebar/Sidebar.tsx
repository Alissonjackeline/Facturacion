import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, PanelLeft, Receipt, Store, X } from "lucide-react";
import { NAV_ITEMS } from "./sidebar.config";
import SidebarNode from "./SidebarNode";
import CollapsedNav from "./CollapsedNav";
import BrandLogo from "../BrandLogo";
import IconButton from "../IconButton";
import Avatar from "../Avatar";
import InfoCard from "../InfoCard";
import { ROUTES } from "../../../../routes/routes";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";

const fade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2, ease: "easeOut" as const },
};

interface SidebarProps {
    mobileOpen: boolean;
    onMobileClose: () => void;
}

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
    const [desktopCollapsed, setDesktopCollapsed] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const collapsed = isDesktop && desktopCollapsed;
    const align = collapsed ? "items-center" : "";

    useEffect(() => {
        onMobileClose();
    }, [pathname]);

    // Cierra con Escape
    useEffect(() => {
        if (!mobileOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onMobileClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [mobileOpen, onMobileClose]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate(ROUTES.LOGIN, { replace: true });
    };

    const toggle = isDesktop ? (
        <IconButton
            label={collapsed ? "Expandir menú" : "Colapsar menú"}
            onClick={() => setDesktopCollapsed((c) => !c)}
        >
            <PanelLeft />
        </IconButton>
    ) : (
        <IconButton label="Cerrar menú" onClick={onMobileClose}>
            <PanelLeft />
        </IconButton>
    );

    return (
        <>
            <AnimatePresence>
                {!isDesktop && mobileOpen && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onMobileClose}
                        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            <motion.aside
                initial={false}
                animate={
                    isDesktop
                        ? { width: collapsed ? 72 : 280, x: 0 }
                        : { width: 280, x: mobileOpen ? 0 : -296 }
                }
                transition={{ type: "spring", stiffness: 380, damping: 36 }}
                className="fixed inset-y-0 left-0 z-50 flex h-dvh shrink-0 flex-col gap-3 overflow-x-hidden border-r border-neutral-200 bg-neutral-50 p-3 lg:static lg:z-auto lg:h-screen"
            >
                {/* Header */}
                <motion.div
                    key={collapsed ? "header-c" : "header-e"}
                    {...fade}
                    className={`flex flex-col gap-3 ${align}`}
                >
                    {collapsed ? (
                        <>
                            <BrandLogo icon={<Receipt />} />
                            {toggle}
                            <InfoCard className="p-2!">
                                <Store className="size-5 text-neutral-450" />
                            </InfoCard>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-3">
                                <BrandLogo
                                    title="Facturación"
                                    subtitle="subtitle"
                                    icon={<Receipt />}
                                />
                                {toggle}
                            </div>

                            <InfoCard>
                                <Store className="size-5 text-neutral-450" />
                                <div className="flex-1 leading-tight">
                                    <p className="text-[10px] font-medium uppercase tracking-wide text-neutral-450">
                                        Punto de emisión
                                    </p>
                                    <p className="text-sm font-medium text-neutral-900">
                                        Sucursal Piura
                                    </p>
                                </div>
                            </InfoCard>
                        </>
                    )}
                </motion.div>

                <div className="h-px w-full shrink-0 bg-neutral-200" />

                {/* Navegación */}
                <motion.div
                    key={collapsed ? "nav-c" : "nav-e"}
                    {...fade}
                    className="flex-1 overflow-y-auto"
                >
                    {collapsed ? (
                        <CollapsedNav pathname={pathname} />
                    ) : (
                        <nav className="flex flex-col gap-1">
                            {NAV_ITEMS.map((item) => (
                                <SidebarNode
                                    key={item.id}
                                    item={item}
                                    level={1}
                                    pathname={pathname}
                                />
                            ))}
                        </nav>
                    )}
                </motion.div>

                {/* Footer */}
                <motion.div
                    key={collapsed ? "footer-c" : "footer-e"}
                    {...fade}
                    className={`flex flex-col gap-3 ${align}`}
                >
                    {collapsed ? (
                        <>
                            <Avatar name="Alisson" online />
                            <IconButton label="Cerrar sesión" onClick={handleLogout}>
                                <LogOut />
                            </IconButton>
                        </>
                    ) : (
                        <InfoCard className="p-2">
                            <Avatar name="Alisson" online />
                            <div className="flex-1 leading-tight">
                                <p className="text-sm font-medium text-neutral-900">Alisson</p>
                                <p className="text-xs text-neutral-450">Administrador</p>
                            </div>
                            <IconButton
                                label="Cerrar sesión"
                                size="sm"
                                onClick={handleLogout}
                                className="hover:bg-white"
                            >
                                <LogOut />
                            </IconButton>
                        </InfoCard>
                    )}
                </motion.div>
            </motion.aside>
        </>
    );
}