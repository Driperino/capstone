"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  Sprout,
  Bell,
  Users,
  Flower2,
  Leaf,
  Home,
  CalendarRange,
  Settings,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/protected/dashboard",
    icon: Home,
  },
  {
    title: "Plant Info",
    url: "/protected/plantinfo",
    icon: Flower2,
  },
  {
    title: "My Plants",
    url: "/protected/myplants",
    icon: Leaf,
  },
  {
    title: "Routines",
    url: "/protected/routines",
    icon: CalendarRange,
  },
];

const sidebarItems = [
  {
    name: "Account Settings",
    route: "/protected/settings/account",
    icon: Settings,
  },
  {
    name: "Notifications",
    route: "/protected/settings/notifications",
    icon: Bell,
  },
  {
    name: "User Management",
    route: "/protected/settings/users",
    icon: Users,
  },
];

interface User {
  name: string;
  email: string;
  image?: string;
}

interface AppSidebarProps {
  user: User;
}

export function AppSidebar({ user }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/" className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Sprout className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Leaf Matrix</span>
                  <span className="text-xs text-sidebar-foreground/60">
                    Grow smarter
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {/* Settings Dropdown */}
              <hr className="flex-1 border-t border-sidebar-border" />
              <Collapsible>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex items-center w-full">
                    <Settings className="flex items-center gap-2" />
                    <span>Settings</span>
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <hr className="flex-1 border-t border-sidebar-border" />
                <CollapsibleContent>
                  {sidebarItems.map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.route}
                          className="flex items-center gap-2"
                        >
                          <item.icon className="size-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex w-full items-center gap-4 p-4">
                <Avatar>
                  <AvatarImage
                    src={user.image || "/placeholder.svg?height=32&width=32"}
                    alt={`${user.name}'s avatar`}
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/api/auth/signout">
                  <LogOut className="mr-2 size-4" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Logout
                  </span>
                </a>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
