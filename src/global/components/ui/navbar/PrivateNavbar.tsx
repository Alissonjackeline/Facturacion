import { Menu } from "lucide-react";
import IconButton from "../IconButton";

interface PrivateNavbarProps {
    onMenuClick?: () => void;
}

export default function PrivateNavbar({ onMenuClick }: PrivateNavbarProps) {
    return (
        <nav className="bg-primary-50 px-4 py-3 md:px-10 flex items-center justify-between">
            <IconButton label="Abrir menú" onClick={onMenuClick} className="lg:hidden">
                <Menu />
            </IconButton>
            PrivateNavbar
        </nav>
    );
}