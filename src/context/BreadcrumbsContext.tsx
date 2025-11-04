// context/BreadcrumbsContext.tsx
'use client';
import { createContext, useContext } from 'react';

export const BreadcrumbsContext = createContext<React.ReactNode>(null);

export function useBreadcrumbs() {
    return useContext(BreadcrumbsContext);
}
