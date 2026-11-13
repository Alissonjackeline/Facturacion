import type { RouteObject } from "react-router-dom";
import { ROUTES } from "../routes";
import AuthGuard from "../guard/AuthGuard";
import PrivateLayout from "../../layouts/PrivateLayout";

export const privateRoutes: RouteObject = {
    element: (
        <AuthGuard>
            <PrivateLayout />
        </AuthGuard>
    ),
    children: [{ path: ROUTES.HOME, element: <p>Home</p> }],
};