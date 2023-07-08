import { useRef } from "react";
import { SERVER_URL } from "../globals";
import { UserCredentials } from ".";

const registerUrl: URL = new URL("/register", SERVER_URL);

interface UserCredentials {
  email: string;
  password: string;
}

export default function UserCredentialsInput() {
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

          const response = await fetch(registerUrl.href, {
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
