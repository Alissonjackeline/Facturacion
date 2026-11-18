import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import MotionContainer from "../global/components/ui/container/MotionContainer";
import PrivateNavbar from "../global/components/ui/navbar/PrivateNavbar";
import Sidebar from "../global/components/ui/sidebar/Sidebar";

export default function PrivateLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const closeMobile = useCallback(() => setMobileOpen(false), []);

    return (
        <div className="flex h-dvh overflow-hidden">
            <Sidebar mobileOpen={mobileOpen} onMobileClose={closeMobile} />

            <div className="flex min-w-0 flex-1 flex-col">
                <PrivateNavbar onMenuClick={() => setMobileOpen(true)} />

                <main className="flex flex-1 flex-col overflow-y-auto">
                    <MotionContainer className="relative z-10 flex-1 w-full max-w-300 flex flex-col items-center justify-center gap-6 mx-auto px-6 py-4 sm:px-0">
                        <Outlet />
                    </MotionContainer>
                </main>
            </div>
        </div>
    );
}