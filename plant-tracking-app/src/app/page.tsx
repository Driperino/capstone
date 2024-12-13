import { redirect } from "next/navigation";
import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";

export default async function Home() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME || "leafmatrix");

  const user = await db
    .collection("users")
    .findOne({ email: session.user.email });

  if (user && user.setup && user.setup.setupCompleted) {
    redirect("/protected/dashboard");
  } else {
    redirect("/protected/user-setup");
  }

  return <></>;
}
