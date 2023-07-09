import { SERVER_URL } from "../../globals";
import { useRef } from "react";
interface UserCredentials {
  email: string;
  password: string;
}

// const loginUrl: URL = new URL("/login", SERVER_URL);

// async function login(userCredentials: UserCredentials) {
//   const loginUrl: URL = new URL("/login", SERVER_URL);
//
//   console.log(document.cookie);
//   const response = await fetch(loginUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userCredentials),
//   });
//   console.log(await response.json())
  // if (response.status === 200) {
  //   console.log(await response.json());
  //   // document.cookie = 'refreshToken=cookieValue; path=/;';
  //   // console.log(document.cookie);
  //
  //   return true;
  // } else {
  //
  //   return false;
  // }
// }

async function _login(userCredentials: UserCredentials): Promise<boolean> {
  const loginUrl: URL = new URL("/login", SERVER_URL);

  const response = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  });

  if (response.status === 200){
    const responseData = await response.json();

    document.cookie = responseData.refreshTokenCookie;
    localStorage.setItem("accessToken", responseData.accessToken);
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
        onSubmit={async (e) => {
          e.preventDefault()
          const userCredentials: UserCredentials = {
            email: emailInput.current.value,
            password: passwordInput.current.value,
          }
          if (!await _login(userCredentials)) {
            alert("wrong credentials!");
          } else {
            alert("hello!");
          }
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
