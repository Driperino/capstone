import { auth } from "@/auth";
import { redirect } from "next/navigation";
import WhoAmIServerAction from "../../components/auth/client/WhoAmIServerAction";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  async function onGetUserAction() {
    const session = await auth();
    if (!session || !session.user) {
      redirect("/api/auth/signin");
    }
    return session?.user?.name ?? null;
  }

  return (
    <div className="flex justify-center items-center text-center">
      <WhoAmIServerAction onGetUserAction={onGetUserAction} />
      {children}
    </div>
  );
}
