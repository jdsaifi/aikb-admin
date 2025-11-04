import Link from 'next/link';
import { cn } from '../lib/utils';

export function LinkButton({
    href,
    children,
    className,
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <Link
            href={href}
            className={cn(
                'hover:underline hover:text-blue-500 hover:cursor-pointer text-blue-500',
                className
            )}
        >
            {children}
        </Link>
    );
}
