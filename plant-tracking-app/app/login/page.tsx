"use client";
import NavButton from "../components/navigation/NavButton";
import LoginForm from "./LoginForm";

export default function Login() {
  //const isLoggedIn = false;
  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm username="" password="" onChange={() => {}} />
      <NavButton target="/home" text="Home" />
    </div>
  );
}
