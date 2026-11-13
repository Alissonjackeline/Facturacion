interface BrandLogoProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export default function BrandLogo({ title, subtitle, className = "" }: BrandLogoProps) {
    return (
        <div className={`flex flex-row w-full gap-2.5 ${className}`}>
            <div className="w-9 h-9 rounded-xl bg-primary-500" />
            <div>
                <p className="font-body-large-regular font-bold text-neutral-900">{title}</p>
                {subtitle && (
                    <p className="font-body-small-medium text-neutral-400">{subtitle}</p>
                )}
            </div>
        </div>
    );
}