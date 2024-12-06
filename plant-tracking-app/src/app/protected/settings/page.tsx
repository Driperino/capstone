import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/settings/SettingsForm";

export default async function ProtectedRoute() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="b-2 b-black ">
      <div className="p-4">Settings</div>
      <div></div>
    </div>
  );
}
