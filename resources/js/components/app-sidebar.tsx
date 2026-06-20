import { Link, usePage } from '@inertiajs/react';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useEffect, useState } from 'react';
import {
    LayoutGrid,
    Package,
    Box,
    Layers,
    MapPin,
    Wallet,
    Wrench,
    Tag,
    Upload,
    Users,
    Shield,
    ChevronDown,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    SidebarGroup,
    SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

interface RoleNavItem extends NavItem {
    roles?: string[];
}

const menuGroups = [
    {
        label: 'Utama',
        items: [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: LayoutGrid,
            },
        ] as RoleNavItem[],
    },
    {
        label: 'Manajemen Inventaris',
        items: [
            {
                title: 'Data Barang',
                href: '/barang',
                icon: Package,
                roles: ['Super Admin', 'Admin Inventaris', 'Staff'],
            },
            {
                title: 'Unit Inventaris',
                href: '/unit-barang',
                icon: Box,
                roles: ['Super Admin', 'Admin Inventaris', 'Staff', 'Pimpinan'],
            },
            {
                title: 'Kategori',
                href: '/kategori',
                icon: Layers,
                roles: ['Super Admin', 'Admin Inventaris', 'Staff'],
            },
            {
                title: 'Ruang',
                href: '/ruang',
                icon: MapPin,
                roles: ['Super Admin', 'Admin Inventaris', 'Staff'],
            },
            {
                title: 'Sumber Dana',
                href: '/sumber-dana',
                icon: Wallet,
                roles: ['Super Admin', 'Admin Inventaris', 'Staff'],
            },
        ] as RoleNavItem[],
    },
    {
        label: 'Aktivitas & Utilitas',
        items: [
            {
                title: 'Pemeliharaan',
                href: '/pemeliharaan',
                icon: Wrench,
            },
            {
                title: 'Label & Print',
                href: '/inventory/labels',
                icon: Tag,
                roles: ['Super Admin', 'Admin Inventaris', 'Staff', 'Pimpinan'],
            },

        ] as RoleNavItem[],
    },
    {
        label: 'Sistem',
        items: [] as RoleNavItem[],
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { auth } = usePage().props as {
        auth: { user: { role?: string } | null };
    };
    const userRole = auth?.user?.role ?? 'Staff';
    const { isCurrentUrl, isCurrentOrParentUrl } = useCurrentUrl();

    const isOnUsersPage = isCurrentOrParentUrl('/users');
    const isOnRolesPage = isCurrentUrl('/roles');
    const [isUsersOpen, setIsUsersOpen] = useState(isOnUsersPage || isOnRolesPage);

    useEffect(() => {
        setIsUsersOpen(isOnUsersPage || isOnRolesPage);
    }, [isOnUsersPage, isOnRolesPage]);

    return (
        <Sidebar
            collapsible="icon"
            className="h-screen overflow-hidden border-r border-sidebar-border"
        >
            {}
            <SidebarHeader className="border-b border-sidebar-border py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="hover:bg-transparent"
                        >
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="[scrollbar-width:none] gap-4 overflow-y-auto px-2 py-4 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {menuGroups.map((group) => {
                    const filteredItems = group.items.filter((item) => {
                        if (!item.roles) return true;
                        return item.roles.includes(userRole);
                    });

                    if (filteredItems.length === 0) return null;

                    return (
                        <SidebarGroup key={group.label} className="mb-2 p-0">
                            <SidebarGroupLabel className="px-3 text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase">
                                {group.label}
                            </SidebarGroupLabel>
                            <NavMain items={filteredItems} />
                        </SidebarGroup>
                    );
                })}

                {}
                {(userRole === 'Super Admin' ||
                    userRole === 'Admin Inventaris') && (
                    <SidebarGroup className="mb-2 p-0">
                        <SidebarGroupLabel className="px-3 text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase">
                            Sistem
                        </SidebarGroupLabel>
                        <SidebarMenu>
                        <Collapsible
                            open={isUsersOpen}
                            onOpenChange={setIsUsersOpen}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip={{ children: 'Users' }}
                                        className="w-full"
                                    >
                                        <Users className="h-4 w-4 shrink-0" />
                                        <span className="flex-1 text-left">
                                            Users
                                        </span>
                                        <ChevronDown className="ml-auto h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-0 -rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={isCurrentUrl('/users')}
                                            >
                                                <Link href="/users" prefetch>
                                                    <Users className="h-4 w-4" />
                                                    <span>
                                                        Manajemen User
                                                    </span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>

                                        {userRole === 'Super Admin' && (
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={isCurrentUrl('/roles')}
                                                >
                                                    <Link href="/roles" prefetch>
                                                        <Shield className="h-4 w-4" />
                                                        <span>
                                                            Role & Izin
                                                        </span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        )}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                        </SidebarMenu>
                    </SidebarGroup>
                )}
            </SidebarContent>

            {}
            <SidebarFooter className="border-t border-sidebar-border p-2">
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
