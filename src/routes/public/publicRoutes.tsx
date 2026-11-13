import type { RouteObject } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import AuthPage from "../../features/public/authentication/pages/AuthPage";
import LoginContainer from "../../features/public/authentication/components/LoginContainer";
import RecoverPasswordContainer from "../../features/public/authentication/components/RecoverPasswordContainer";
import ResetPasswordContainer from "../../features/public/authentication/components/ResetPasswordContainer";
import { ROUTES } from "../routes";

export const publicRoutes: RouteObject = {
    element: <PublicLayout />,
    children: [
        {
            element: <AuthPage />,
            children: [
                { path: ROUTES.LOGIN, element: <LoginContainer /> },
                { path: ROUTES.RECOVER_PASSWORD, element: <RecoverPasswordContainer /> },
                { path: ROUTES.RESET_PASSWORD, element: <ResetPasswordContainer /> },
            ],
        },
    ],
};