import { cn } from "../../../utils/cn";

interface AvatarProps {
    name: string;
    online?: boolean;
    className?: string;
}

export default function Avatar({ name, online = false, className }: AvatarProps) {
    return (
        <div
            className={cn(
                "relative size-9 shrink-0 grid place-items-center rounded-full bg-primary-500 text-sm font-medium text-white",
                className
            )}
        >
            {name.charAt(0).toUpperCase()}
            {online && (
                <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-white bg-green-500" />
            )}
        </div>
    );
}