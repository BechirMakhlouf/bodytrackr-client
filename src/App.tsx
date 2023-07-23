import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { UserInfo } from "../globals";
import {
  getUserInfoFromLocalStorage,
  getWeightLogFromLocalStorage,
  storeUserInfoToLocalStorage,
} from "./utils/utils";
import DashboardPage from "./pages/dashboardPage";
import { checkIfLoggedIn } from "./controllers/sessionManagementController";
import {
  getUserInfoFromServer,
  setUserInfoToServer,
} from "./controllers/userInfoController";

type context<T> = { state: T; setState: Dispatch<SetStateAction<T>> };

export const loginContext = createContext<context<boolean>>(
  {} as context<boolean>,
);
export const userInfoContext = createContext<context<UserInfo>>(
  {} as context<UserInfo>,
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(() =>
    getUserInfoFromLocalStorage() || new UserInfo()
  );

  useEffect(() => {
    userInfo.weightLog = getWeightLogFromLocalStorage();

    (async () => {
      setIsLoggedIn(await checkIfLoggedIn());
    })();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserInfoFromServer().then((userInfoFromServer) => {
        setUserInfo(userInfoFromServer as UserInfo);
      });
    }
  }, [isLoggedIn]);


  useEffect(() => {
    storeUserInfoToLocalStorage(userInfo);
    setUserInfoToServer(userInfo);

  }, [userInfo, isLoggedIn]);

  return (
    <loginContext.Provider
      value={{ state: isLoggedIn, setState: setIsLoggedIn }}
    >
      <userInfoContext.Provider
        value={{ state: userInfo, setState: setUserInfo }}
      >
             <DashboardPage />
           {/*  <LoginPage />
             <RegisterPage /> */}
      </userInfoContext.Provider>
    </loginContext.Provider>
  );
}
