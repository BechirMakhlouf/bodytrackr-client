import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  LoginState,
  requestNewAccessToken,
} from "../controllers/sessionManagementController";

const defaultLoginState: LoginState = {
  isLoggedIn: null,
  hasRefreshToken: null,
  accessToken: null,
};

export default function useLoginState(): [
  LoginState,
  Dispatch<SetStateAction<LoginState>>,
] {
  const [loginState, setLoginState] = useState<LoginState>(defaultLoginState);

  useEffect(() => {
    requestNewAccessToken().then((resToken) => {
      if (resToken) {
        setLoginState({
          isLoggedIn: true,
          hasRefreshToken: true,
          accessToken: resToken,
        });
      } else {
        setLoginState({
          isLoggedIn: false,
          hasRefreshToken: false,
          accessToken: null,
        });
      }
    });
  }, []);

  return [loginState, setLoginState];
}
