import { Outlet } from "react-router-dom";
import MotionContainer from "../global/components/ui/container/MotionContainer";

export default function PrivateLayout() {
    return (
        <div>
            <p>PrivateLayout</p>
            <MotionContainer className="relative z-10 flex-1 w-full max-w-300 flex flex-col items-center justify-center gap-6 mx-auto px-6 py-4 sm:px-0">
                <Outlet />
            </MotionContainer>
        </div>
    );
}