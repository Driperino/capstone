import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return <div className="flex justify-center text-center">{children}</div>;
}
