import { getServerSession } from "next-auth";
import UserSettings from "@/components/settings/UserSettings";

const UserSettingsPage = async () => {
  const session = await getServerSession();

  return (
    <div className="justify-center align-middle m-auto">
      <UserSettings session={session} />
    </div>
  );
};

export default UserSettingsPage;
