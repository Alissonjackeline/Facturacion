import { Outlet } from "react-router-dom";

export default function PublicLayout() {
    return (
        <div className="min-h-dvh flex flex-col overflow-x-hidden">
            <Outlet />
        </div>
    );
}