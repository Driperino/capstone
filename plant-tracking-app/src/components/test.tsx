"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex m-auto">
        Hi {session?.user?.name}!
        <br />
        <button className="hover:text-red-500" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="flex m-auto">
      Not signed in
      <br />
      <button className="hover:text-blue-500" onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  );
}
