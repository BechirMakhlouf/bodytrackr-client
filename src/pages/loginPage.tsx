import { SERVER_URL } from "../../globals";
import { useRef } from "react";
interface UserCredentials {
  email: string;
  password: string;
}

// const loginUrl: URL = new URL("/login", SERVER_URL);

export async function login(userCredentials: UserCredentials) {

  const loginUrl: URL = new URL("/login", SERVER_URL);
  const response = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  });

  if (response.status === 200) {
    console.log(await response.json());
    // document.cookie = 'refreshToken=cookieValue; path=/;';
    // console.log(document.cookie);

    return true;
  } else {

    return false;
  }
}

export default function LoginPage() {
  const emailInput = useRef({} as HTMLInputElement);
  const passwordInput = useRef({} as HTMLInputElement);
  return (
    <>
      <form
        action="http://127.0.0.1:6969/login"
        method="POST"
      >
        <input
          ref={emailInput}
          className="border-1 border-black"
          type="email"
          name="email"
          required={true}
        />

        <input
          ref={passwordInput}
          className="border-1 border-black"
          type="password"
          name="password"
          required={true}
        />

        <button type="submit">Log in</button>
      </form>
    </>
  );
}

export type { UserCredentials };