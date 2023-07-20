import { SubmitHandler, useForm } from "react-hook-form";
import {
  sendCredentials,
  UserCredentials,
} from "../controllers/sessionManagementController";

const onSubmit: SubmitHandler<UserCredentials> = async (
  data: UserCredentials,
) => {
  const sessionToken: string | null = await sendCredentials(data, "register");

  if (sessionToken) {
    localStorage.setItem("sessionToken", sessionToken);
  }
  //check if the server is down
};

export default function RegisterPage() {
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

