'use client';

import * as React from 'react';
import {
    IconCamera,
    IconDashboard,
    IconFile,
    IconFileAi,
    IconFileDescription,
    IconFolder,
    IconHelp,
    IconInnerShadowTop,
    IconPhoneCall,
    IconSearch,
    IconSettings,
    IconUsers,
} from '@tabler/icons-react';
// import { Users, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { checkPermission } from '@/lib/hasPermission';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/images/shadcn.jpg',
    },
    navMain: [
        {
            title: 'Dashboard',
            url: '/admin/dashboard',
            icon: IconDashboard,
            // requiredPermissions: ['dashboard.view'], // Commented out to match middleware
        },
        {
            title: 'Documents',
            url: '/admin/documents',
            icon: IconFile,
            // requiredPermissions: ['documents.view'],
        },
        {
            title: 'Users',
            url: '/admin/users',
            icon: IconUsers,
            // requiredPermissions: ['users.view'],
        },
    ],
    navClouds: [
        {
            title: 'Capture',
            icon: IconCamera,
            isActive: true,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
        {
            title: 'Proposal',
            icon: IconFileDescription,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
        {
            title: 'Prompts',
            icon: IconFileAi,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: 'Settings',
            url: '#',
            icon: IconSettings,
        },
        {
            title: 'Get Help',
            url: '#',
            icon: IconHelp,
        },
        {
            title: 'Search',
            url: '#',
            icon: IconSearch,
        },
    ],
    documents: [
        // {
        //     name: 'Data Library',
        //     url: '#',
        //     icon: IconDatabase,
        // },
        // {
        //     name: 'Reports',
        //     url: '#',
        //     icon: IconReport,
        // },
        // {
        //     name: 'Word Assistant',
        //     url: '#',
        //     icon: IconFileWord,
        // },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { data: session } = useSession();
    const userPermissions = session?.permissions || [];
    const userRole = session?.user?.role;

    // Filter navigation items based on user permissions
    const filteredNavMain = data.navMain.filter((item: any) => {
        // Admin users can see everything
        if (userRole === 'admin') {
            return true;
        }

        // If no permissions are required, show the item
        if (
            !item.requiredPermissions ||
            item.requiredPermissions.length === 0
        ) {
            return true;
        }

        // Check if user has any of the required permissions
        return checkPermission(
            item.requiredPermissions,
            userPermissions,
            userRole
        );
    });

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="#">
                                <IconInnerShadowTop className="!size-5" />
                                <span className="text-base font-semibold">
                                    AI Knowledge Base
                                </span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={filteredNavMain} />
                {/* <NavDocuments items={data.documents} /> */}
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
