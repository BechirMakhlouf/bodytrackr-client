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

export default function App() {
  const [weightLog, setWeightLog] = useState(() => userInfo.weightLog);
  const [preferences, setPrefrences] = useState(() => userInfo.preferences);
  useEffect(() => {
    storeWeightLogToLocalStorage(weightLog);
  }, [weightLog]);

  useEffect(() => {
    // userInfo.weightLog = weightLog;
    // userInfo.preferences = preferences;

    storeUserInfoToLocalStorage(userInfo);
  }, [userInfo, weightLog, preferences]);

  return (
    <preferencesContext.Provider
      value={{ state: preferences, setState: setPrefrences }}
    >
      <weightLogContext.Provider
        value={{ state: weightLog, setState: setWeightLog }}
      >
        {/* <DashboardPage /> */}
        <LoginPage />
      </weightLogContext.Provider>
    </preferencesContext.Provider>
  );
}
