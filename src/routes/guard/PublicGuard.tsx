import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../routes";

export default function PublicGuard({ children }: { children: ReactNode }) {
    const isAuthenticated = !!localStorage.getItem("token");

    if (isAuthenticated) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <>{children}</>;
}