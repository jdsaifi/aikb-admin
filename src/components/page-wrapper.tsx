import { AppSidebar } from './app-sidebar';
import { SiteHeader } from './site-header';
import { SidebarInset, SidebarProvider } from './ui/sidebar';

export function PageWrapper({
    children,
    breadcrumbs,
}: {
    children: React.ReactNode;
    breadcrumbs: React.ReactNode | null;
}) {
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 72)',
                    '--header-height': 'calc(var(--spacing) * 12)',
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader breadcrumbs={breadcrumbs} />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-4 lg:px-6">{children}</div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

// function PageWrapper({ children }: { children: React.ReactNode }) {
//     let breadcrumbs: ReactNode = null;
//     const content: ReactNode[] = [];

//     Children.forEach(children, (child: ReactNode) => {
//         if (isValidElement(child) && child.type === PageWrapper.Breadcrumbs) {
//             breadcrumbs = child?.props?.children as ReactNode;
//         } else {
//             content.push(child);
//         }
//     });

//     return (
//         <BreadcrumbsContext.Provider value={breadcrumbs}>
//             <SidebarProvider
//                 style={
//                     {
//                         '--sidebar-width': 'calc(var(--spacing) * 72)',
//                         '--header-height': 'calc(var(--spacing) * 12)',
//                     } as React.CSSProperties
//                 }
//             >
//                 <AppSidebar variant="inset" />
//                 <SidebarInset>
//                     <SiteHeader />
//                     <div className="flex flex-1 flex-col">
//                         <div className="@container/main flex flex-1 flex-col gap-2">
//                             <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
//                                 <div className="px-4 lg:px-6">{content}</div>
//                             </div>
//                         </div>
//                     </div>
//                 </SidebarInset>
//             </SidebarProvider>
//         </BreadcrumbsContext.Provider>
//     );
// }

// PageWrapper.Breadcrumbs = function Breadcrumbs({
//     children,
// }: {
//     children: ReactNode;
// }) {
//     return <Fragment>{children}</Fragment>; // just a placeholder
// };

// export { PageWrapper };
