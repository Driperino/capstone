import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/auth/SessionProvider";
import { AppSidebar } from "@/components/app-sidebar";
import { getCurrentUser } from "@/lib/session";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { ThemeWrapper } from "@/components/ui/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";

export const metadata: Metadata = {
  title: "Leaf Matrix",
  description: "Grow Smarter",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <ThemeWrapper
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <SidebarProvider>
              {user && <AppSidebar user={user} />}
              <SidebarInset>
                <header className="flex h-16 shrink-0 justify-center items-center gap-2 border-b px-2">
                  <SidebarTrigger className="-ml-1" />
                  <div className="flex justify-end ml-auto">
                    <ModeToggle />
                  </div>
                </header>
                <main className="flex-1 mx-auto">{children}</main>
              </SidebarInset>
            </SidebarProvider>
          </SessionProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
