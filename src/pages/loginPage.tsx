import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  sendCredentials,
  UserCredentials,
} from "../controllers/sessionManagementController";
import { getUserInfoFromServer } from "../controllers/userInfoController";

export default function LoginPage() {
  const { register, handleSubmit } = useForm<UserCredentials>();

  const onSubmit: SubmitHandler<UserCredentials> = useCallback(async (
    data: UserCredentials,
  ) => {
    const accessToken: string | null = await sendCredentials(data, "login");
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      console.log(await getUserInfoFromServer());
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
