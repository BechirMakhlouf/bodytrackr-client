// import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface UserCredentials {
  email: string;
  password: string;
}

interface Tokens {
  sessionToken: string,
  refreshToken: string,
}

const onSubmit: SubmitHandler<UserCredentials> = async (data: UserCredentials) => {
  await sendCredentials(data, "register");
};

// change EXPORT
export async function sendCredentials(userCredentials: UserCredentials, endPoint: "login" | "register"): Promise<Tokens> {
  const requestURL: URL = new URL(endPoint, import.meta.env.VITE_SERVER_URL);
  
  const tokens = await fetch(requestURL, {
    method: "POST",
    headers: {
      "mode": "cors",
      "Content-Type": "application/json",
    },  
    body: JSON.stringify(userCredentials),
  })
   console.log(await tokens.json());
  return await tokens.json();
} 

export default function LoginPage() {
  const { register, handleSubmit } = useForm<UserCredentials>();

  return (
    <>
      <h1>Hello world</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          autoComplete="current_email"
          type="text"
          {...register("email", {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
          })}
          className=""
        />
        <input
          autoComplete="current_password"
          type="password"
          {...register("password", {
            required: true,
            minLength: 8,
            maxLength: 64,
          })}
        />
        <input type="submit" />
      </form>
    </>
  );
}

export type { UserCredentials };
