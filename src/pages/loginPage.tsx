import { SERVER_URL } from "../../globals";
import { useRef } from "react";

interface UserCredentials {
  email: string;
  password: string;
}

const loginUrl: URL = new URL("/login", SERVER_URL);

export default function LoginPage() {
  const emailInput = useRef({} as HTMLInputElement);
  const passwordInput = useRef({} as HTMLInputElement);
  return (
    <>
      <h1></h1>
      <form
        action=""
        onSubmit={async (e) => {
          e.preventDefault();
          const userCredentials: UserCredentials = {
            email: emailInput.current.value,
            password: passwordInput.current.value,
          };

          const response = await fetch(loginUrl.href, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userCredentials),
          });

          console.log(await response.json());
        }}
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