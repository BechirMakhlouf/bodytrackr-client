import { useRef } from "react";
import { SERVER_URL } from "../../globals";
import { UserCredentials } from "./loginPage";
// const registerUrl: URL = new URL("/register", SERVER_URL);

async function login(userCredentials: UserCredentials) {
  const loginUrl: URL = new URL("/login", SERVER_URL);

  const response = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  });
  console.log(response);
  console.log(await response.json());
}

export default function RegisterPage() {
  const emailInput = useRef({} as HTMLInputElement);
  const passwordInput = useRef({} as HTMLInputElement);

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const userCredentials: UserCredentials = {
            email: emailInput.current.value,
            password: passwordInput.current.value,
          };

          await login(userCredentials);
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

        <button type="submit">Register</button>
      </form>
    </>
  );
}
