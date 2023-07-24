import { useCallback, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { loginContext } from "../App";
import {
  sendCredentials,
  setAccessTokenToLocalStorage,
  UserCredentials,
} from "../controllers/sessionManagementController";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<UserCredentials>();
  const { setState: setIsLoggedIn } = useContext(loginContext);

  const onSubmit: SubmitHandler<UserCredentials> = useCallback(async (
    data: UserCredentials,
  ) => {
    const accessToken: string | null = await sendCredentials(data, "register");

    if (accessToken) {
      setAccessTokenToLocalStorage(accessToken);
      setIsLoggedIn({
        accessToken: accessToken,
        isLoggedIn: true,
        hasRefreshToken: true,
      });
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
