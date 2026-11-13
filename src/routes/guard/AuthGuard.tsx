import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../routes";

export default function AuthGuard({ children }: { children: ReactNode }) {
    const isAuthenticated = !!localStorage.getItem("token"); // cámbialo por tu auth real

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return <>{children}</>;
}