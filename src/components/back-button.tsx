'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

export function BackButton({
    className,
    children,
    variant = 'default',
    ...props
}: {
    className?: string;
    children?: React.ReactNode;
    variant?: 'outline' | 'default' | 'ghost' | 'link' | 'destructive';
    color?: 'default' | 'red';
    props?: React.ComponentProps<'button'>;
}) {
    const router = useRouter();
    return (
        <Button
            type="button"
            onClick={() => router.back()}
            className={cn('cursor-pointer', className)}
            variant={variant}
            {...props}
        >
            {children}
        </Button>
    );
}
