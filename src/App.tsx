import { createContext, Dispatch, SetStateAction, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserInfo } from "../globals";
import DashboardPage from "./pages/dashboardPage";
import {
  LoginState,
  updateAccessToken,
} from "./controllers/sessionManagementController";
import LoginPage from "./pages/loginPage";
import WelecomePage from "./pages/welcomePage";
import RegisterPage from "./pages/registerPage";
import {
  getUserInfoFromServer,
  setUserInfoToServer,
} from "./controllers/userInfoController";
import {
  getUserInfoFromLocalStorage,
  storeUserInfoToLocalStorage,
} from "./utils/utils";

type context<T> = { state: T; setState: Dispatch<SetStateAction<T>> };

export const loginContext = createContext<context<LoginState>>(
  {} as context<LoginState>,
);

export const userInfoContext = createContext<context<UserInfo>>(
  {} as context<UserInfo>,
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/welcomePage",
    element: <WelecomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

let accessToken: string | null = null;
let initialUserInfo: UserInfo | null;
let initialLoginState: LoginState;

try {
  accessToken = await updateAccessToken();

  if (accessToken) {
    initialUserInfo = await getUserInfoFromServer(accessToken);
  } else {
    initialUserInfo = getUserInfoFromLocalStorage("guestUserInfo");
  }
} catch (e) {
  initialUserInfo = getUserInfoFromLocalStorage("guestUserInfo");
}

initialLoginState = {
  isLoggedIn: Boolean(accessToken),
  hasRefreshToken: Boolean(accessToken),
  accessToken: accessToken,
};

export default function App() {
  const [loginState, setLoginState] = useState<LoginState>(initialLoginState);

  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [guestUserInfo, setGuestUserInfo] = useState(
    getUserInfoFromLocalStorage("guestUserInfo") || new UserInfo(),
  );

  const [userInfoInUse, setUserInfoInUse] = [
    loginState.isLoggedIn ? userInfo as UserInfo : guestUserInfo,
    loginState.isLoggedIn
      ? setUserInfo as Dispatch<SetStateAction<UserInfo>>
      : setGuestUserInfo,
  ];

  if (userInfo && accessToken) {
    setUserInfoToServer(userInfo, accessToken);
  } else {
    storeUserInfoToLocalStorage(guestUserInfo, "guestUserInfo");
  }

  return (
    <loginContext.Provider
      value={{ state: loginState, setState: setLoginState }}
    >
      <userInfoContext.Provider
        value={{
          state: userInfoInUse,
          setState: setUserInfoInUse,
        }}
      >
        <RouterProvider router={router} />
      </userInfoContext.Provider>
    </loginContext.Provider>
  );
}
