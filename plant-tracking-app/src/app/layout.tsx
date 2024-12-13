import type { Metadata } from "next";
import { redirect } from "next/navigation";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/auth/SessionProvider";
import { AppSidebar } from "@/components/app-sidebar";
import { getCurrentUser } from "@/lib/session";
import { ThemeWrapper } from "@/components/ui/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { authOptions } from "@/auth/authOptions";

export const metadata: Metadata = {
  title: "Leaf Matrix",
  description: "Grow Smarter",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  // Ensure user and session are both valid
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  // Build userData object
  const userData = {
    id: session.user.id || "",
    badges: session.user.earnedBadges?.length || 0,
    plants: session.user.uploadedPlants || 0,
    streak: session.user.streakDays || 0,
    earnedBadges: session.user.earnedBadges || [],
  };

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
              <AppSidebar user={session.user} />
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
