import { ReactNode, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import xmarkIcon from "../assets/xmark-solid.svg";
import {
  sendCredentials,
  UserCredentials,
} from "../controllers/sessionManagementController";
import { getUserInfoFromServer } from "../controllers/userInfoController";

export default function LoginModal(props: { children: ReactNode }) {
  const { register, handleSubmit } = useForm<UserCredentials>();
  const [isOpen, setIsOpen] = useState(false);

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
      <div
        className="w-full h-full flex border box-border"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        {props.children}
      </div>
      {isOpen
        ? (
          <div
            className="z-10 flex fixed bottom-0 right-0 w-screen h-screen bg-opacity-40 justify-center bg-black items-center"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <form
              className="relative flex flex-col p-16 bg-white border bg-opacity-100 opacity-100 justify-between border-white-grey rounded-[36px] custom-shadow text-black"
              onSubmit={handleSubmit(onSubmit)}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <img
                src={xmarkIcon}
                alt="close-login-modal"
                className="absolute opacity-30 hover:cursor-pointer group-hover:inline hover:opacity-60 active:opacity-30 w-8 h-8 top-6 right-6"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              />
              <h1 className="text-3xl border-b pb-4">Log In</h1>
              <div className="my-4">
                <label htmlFor="email" className="text-gray-600">
                  Enter email:
                </label>
                <input
                  autoComplete="current_email"
                  type="text"
                  {...register("email", {
                    required: true,
                  })}
                  className="block border rounded-[12px] p-2"
                />
              </div>

              <div className="my-4">
                <label htmlFor="email" className="text-gray-600">
                  Enter password
                </label>
                <input
                  autoComplete="current_password"
                  type="password"
                  className="block border rounded-[12px] p-2 text-gray-600 hover:cursor-pointer"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 64,
                  })}
                />
              </div>
              <input
                type="submit"
                className="border rounded-[12px] p-2 self-end cursor-pointer"
                value="Log In"
              />
            </form>
          </div>
        )
        : undefined}
    </>
  );
}
