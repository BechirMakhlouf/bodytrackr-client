import { ReactNode, useCallback, useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import xmarkIcon from "../assets/xmark-solid.svg";
import {
  handleLoginState,
  LoginState,
  sendCredentials,
  UserCredentials,
} from "../controllers/sessionManagementController";
import { loginContext } from "../App";

type SubmitType = "login" | "register";

interface UserCredentialswithCaptcha extends UserCredentials {
  captchaToken: string;
}

export default function LoginModal(props: { children: ReactNode }) {
  const [submitType, setSubmitType] = useState<SubmitType>("login");
  const { register, handleSubmit, control } = useForm<UserCredentialswithCaptcha>();
  const [isOpen, setIsOpen] = useState(false);
  const { setState: setLoginState } = useContext(loginContext);

  const onSubmit: SubmitHandler<UserCredentialswithCaptcha> = useCallback(
    async (data: UserCredentialswithCaptcha) => {
      let accessToken: string | null = await sendCredentials(data, submitType);

      if (accessToken) {
        const loginState: LoginState = await handleLoginState(accessToken);
        setLoginState(loginState);
        window.location.reload();
      }
    },
    [submitType],
  );

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
              <h1 className="text-3xl border-b pb-4">
                {submitType === "login" ? "Log In" : "Register"}
              </h1>
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
              <Controller
                control={control}
                name="captchaToken"
                render={({ field: { onChange } }) => {
                  return (
                    <ReCAPTCHA
                      sitekey="6LcGT10nAAAAAI2LKsjtTcQyz3TXeVFzWfx8VbAQ"
                      onChange={onChange}
                    />
                  );
                }}
                rules={{
                  required: true,
                }}
              />
              <input
                type="submit"
                className="border rounded-[12px] p-2 self-end hover:cursor-pointer"
                value="Log In"
              />
              <span
                onClick={() =>
                  setSubmitType((prevSubmitType) =>
                    prevSubmitType === "login" ? "register" : "login"
                  )}
              >
                or {submitType === "login" ? "Register" : "Log In"}
              </span>
            </form>
          </div>
        )
        : undefined}
    </>
  );
}
