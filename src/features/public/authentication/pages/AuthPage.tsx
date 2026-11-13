import { Outlet } from "react-router-dom";
import MotionContainer from "../../../../global/components/ui/container/MotionContainer";

export default function AuthPage() {
    return (
        <MotionContainer className="flex flex-1 w-full min-h-dvh">
            <section className="hidden lg:flex lg:w-3/5 bg-primary-100">

            </section>

            <section className="flex flex-col w-full lg:w-2/5 items-center justify-center bg-neutral-50 px-8 md:px-16 gap-6">
                <Outlet />
            </section>
        </MotionContainer>
    );
}