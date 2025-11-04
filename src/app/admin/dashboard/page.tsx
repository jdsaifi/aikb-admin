import { AppSidebar } from '@/components/app-sidebar';
import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/components/section-cards';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { PermissionExample } from '@/components/permission-example';
import data from './data.json';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { auth } from '@/auth';

const Breadcrumbs = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default async function Page() {
    const session = await auth();
    const userPermissions = session?.permissions || [];
    const userRole = session?.user?.role;
    console.log('Session data: ', session);

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
                <SiteHeader breadcrumbs={<Breadcrumbs />} />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <h1 className="text-2xl font-bold m-4">
                                Welcome to AI Knowledge Base Admin Dashboard
                            </h1>
                            {/* <SectionCards /> */}
                            <div className="px-4 lg:px-6">
                                {/* <ChartAreaInteractive /> */}
                                {/* <PermissionExample
                                    userPermissions={userPermissions}
                                    userRole={userRole}
                                /> */}
                            </div>
                            {/* <DataTable data={data} /> */}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
