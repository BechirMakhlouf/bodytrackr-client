import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserInfo } from "../globals";
import {
  getUserInfoFromLocalStorage,
  storeUserInfoToLocalStorage,
} from "./utils/utils";
import DashboardPage from "./pages/dashboardPage";
import {
  getAccessTokenFromLocalStorage,
  handleLoginState,
  LoginState,
} from "./controllers/sessionManagementController";
import {
  getUserInfoFromServer,
  setUserInfoToServer,
} from "./controllers/userInfoController";
import LoginPage from "./pages/loginPage";
import WelecomePage from "./pages/welcomePage";
import RegisterPage from "./pages/registerPage";

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
const loginState = await handleLoginState();
let initialUserInfo: UserInfo | null = getUserInfoFromLocalStorage();

if (loginState.isLoggedIn && loginState.accessToken) {
  const userInfoFromServer: UserInfo | null = await getUserInfoFromServer(
    loginState.accessToken,
  );
  initialUserInfo = userInfoFromServer;
}

export default function App() {
  const [login, setLogin] = useState<LoginState>(
    loginState,
  );
  const [userInfo, setUserInfo] = useState(() =>
    initialUserInfo || new UserInfo()
  );

  useEffect(() => {
    storeUserInfoToLocalStorage(userInfo);
    (async () => {
      if (login.isLoggedIn && login.accessToken) {
        setUserInfoToServer(userInfo, login.accessToken);
      }
    })();
  }, [userInfo]);

  return (
    <loginContext.Provider
      value={{ state: login, setState: setLogin }}
    >
      <userInfoContext.Provider
        value={{ state: userInfo, setState: setUserInfo }}
      >
        <RouterProvider router={router} />
      </userInfoContext.Provider>
    </loginContext.Provider>
  );
}
