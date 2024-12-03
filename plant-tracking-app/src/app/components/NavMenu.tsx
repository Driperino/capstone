"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const ACTIVE_ROUTE = "py-1 text-blue-500 hover:text-blue-300 hover:bg-blue-700";
const INACTIVE_ROUTE =
  "py-1 text-gray-500 hover:text-gray-300 hover:bg-gray-700";

function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Hi {session?.user?.name}!
        <br />
        <button className="hover:text-red-500" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in
      <br />
      <button className="hover:text-blue-500" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
}

export default function NavMenu() {
  const pathname = usePathname();
  return (
    <nav>
      <AuthButton />
      <hr className="my-4" />
      <ul>
        <Link href="/">
          <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            Home
          </li>
        </Link>
        <Link href="/protected">
          <li
            className={
              pathname === "/protected" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Protected Route
          </li>
        </Link>
        <Link href="/serverAction">
          <li
            className={
              pathname === "/serverAction" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            server action
          </li>
        </Link>
      </ul>
    </nav>
  );
}
