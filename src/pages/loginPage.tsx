// import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { sendCredentials } from "../controllers/sessionManagementController";
interface UserCredentials {
  email: string;
  password: string;
}


const onSubmit: SubmitHandler<UserCredentials> = async (
  data: UserCredentials,
) => {
   
  console.log(await sendCredentials(data, "register"));
};



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
