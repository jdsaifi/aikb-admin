'use client';
import { useEffect, useState } from 'react';

export function DisplayDate({ date }: { date: string | number | Date }) {
    const [formatted, setFormatted] = useState('');

    useEffect(() => {
        const d = new Date(date);
        const localeString = d.toLocaleString(); // you can specify locale if needed
        setFormatted(localeString);
    }, [date]);

    return <span>{formatted}</span>;
}
