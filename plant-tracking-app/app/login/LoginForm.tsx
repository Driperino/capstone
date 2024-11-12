"use client";

import LoginButton from "./LoginButton";

interface LoginFormProps {
  username: string;
  password: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LoginForm(props: LoginFormProps) {
  return (
    <div>
      <input
        type="text"
        name="username"
        value={props.username}
        onChange={props.onChange}
      />
      <input
        type="password"
        name="password"
        value={props.password}
        onChange={props.onChange}
      />
      <LoginButton />
    </div>
  );
}
