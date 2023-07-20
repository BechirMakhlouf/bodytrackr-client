import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  sendCredentials,
  UserCredentials,
} from "../controllers/sessionManagementController";

export default function LoginPage() {
  const { register, handleSubmit } = useForm<UserCredentials>();

  const onSubmit: SubmitHandler<UserCredentials> = useCallback(async (
    data: UserCredentials,
  ) => {
    const sessionToken: string | null = await sendCredentials(data, "login");

    if (sessionToken) {
      localStorage.setItem("sessionToken", sessionToken);
    }
    //check if the server is down
  }, []);

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
