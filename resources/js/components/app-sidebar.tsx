import { Link, usePage } from '@inertiajs/react';
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
    SidebarGroup,
    SidebarGroupLabel,
} from '@/components/ui/sidebar';
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
            {
                title: 'Import Data',
                href: '/inventory/import',
                icon: Upload,
                roles: ['Super Admin', 'Admin Inventaris'],
            },
        ] as RoleNavItem[],
    },
    {
        label: 'Sistem',
        items: [
            {
                title: 'Manajemen User',
                href: '/users',
                icon: Users,
                roles: ['Super Admin', 'Admin Inventaris', 'Admin'],
            },
        ] as RoleNavItem[],
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { auth } = usePage().props as {
        auth: { user: { role?: string } | null };
    };
    const userRole = auth?.user?.role ?? 'Staff';

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
            </SidebarContent>

            {}
            <SidebarFooter className="border-t border-sidebar-border p-2">
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
