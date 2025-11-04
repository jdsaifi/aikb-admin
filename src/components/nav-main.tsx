'use client';

import { type Icon } from '@tabler/icons-react';

// import { Button } from '@/components/ui/button';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuPortal,
//     DropdownMenuSeparator,
//     DropdownMenuSub,
//     DropdownMenuSubContent,
//     DropdownMenuSubTrigger,
// } from './ui/dropdown-menu';
// import {
//     DropdownMenuLabel,
//     DropdownMenuShortcut,
//     DropdownMenuTrigger,
// } from './ui/dropdown-menu';

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: Icon | React.ComponentType<any>;
        requiredPermissions?: string[];
    }[];
}) {
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2">
                        {/* <SidebarMenuButton
                            tooltip="Quick Create"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                        >
                            <IconCirclePlusFilled />
                            <span>Quick Create</span>
                        </SidebarMenuButton>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Open</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Profile
                                        <DropdownMenuShortcut>
                                            ⇧⌘P
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Billing
                                        <DropdownMenuShortcut>
                                            ⌘B
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Settings
                                        <DropdownMenuShortcut>
                                            ⌘S
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Keyboard shortcuts
                                        <DropdownMenuShortcut>
                                            ⌘K
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Team</DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            Invite users
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem>
                                                    Email
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Message
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    More...
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                    <DropdownMenuItem>
                                        New Team
                                        <DropdownMenuShortcut>
                                            ⌘+T
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>GitHub</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuItem disabled>
                                    API
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    Log out
                                    <DropdownMenuShortcut>
                                        ⇧⌘Q
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}

                        {/* <Button
                            size="icon"
                            className="size-8 group-data-[collapsible=icon]:opacity-0"
                            variant="outline"
                        >
                            <IconMail />
                            <span className="sr-only">Inbox</span>
                        </Button> */}
                    </SidebarMenuItem>
                </SidebarMenu>

                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title}>
                                {item.icon && <item.icon />}
                                <Link href={item.url} className="w-full">
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
