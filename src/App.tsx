import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { UserInfo, UserPreferences, Weight } from "../globals";
import {
  getUserInfoFromLocalStorage,
  getWeightLogFromLocalStorage,
  storeUserInfoToLocalStorage,
  storeWeightLogToLocalStorage,
} from "./utils/utils";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import { useIsLoggedIn } from "./hooks/useisLoggedInHook";

const userInfo: UserInfo = getUserInfoFromLocalStorage() || new UserInfo();

userInfo.weightLog = getWeightLogFromLocalStorage();

type context<T> = { state: T; setState: Dispatch<SetStateAction<T>> };

export const preferencesContext = createContext<context<UserPreferences>>(
  {} as context<UserPreferences>,
);
export const weightLogContext = createContext<context<Weight[]>>(
  {} as context<Weight[]>,
);
export const userInfoContext = createContext<context<UserInfo>>(
  {} as context<UserInfo>,
);

export const loginContext = createContext<boolean | null>(null);

export default function App() {
  const [weightLog, setWeightLog] = useState(() => userInfo.weightLog);
  const [preferences, setPrefrences] = useState(() => userInfo.preferences);
  const [currentUserInfo, setCurrentUserInfo] = useState(() => userInfo)
  const [isLoggedIn, isLoading] = useIsLoggedIn();

  useEffect(() => {
    storeWeightLogToLocalStorage(weightLog);
  }, [weightLog]);

  useEffect(() => {
    userInfo.weightLog = weightLog;
    userInfo.preferences = preferences;
    storeUserInfoToLocalStorage(userInfo);
  }, [userInfo, weightLog, preferences]);

  return (
    <userInfoContext.Provider value={{state: currentUserInfo, setState: setCurrentUserInfo}}>
      <preferencesContext.Provider
        value={{ state: preferences, setState: setPrefrences }}
      >
        <weightLogContext.Provider
          value={{ state: weightLog, setState: setWeightLog }}
        >
          {/* <DashboardPage /> */}
          <LoginPage />
          <RegisterPage />
          {isLoggedIn ? <h1> hello `${userInfo.email}`</h1> : ""}
        </weightLogContext.Provider>
      </preferencesContext.Provider>
    </userInfoContext.Provider>
  );
}
