import { createContext, useState, Dispatch, SetStateAction } from "react";
import { UserInfo, UserPreferences, Weight } from "../globals";
import DashboardPage from "./pages/dashboardPage";
import { getUserInfoFromLocalStorage, getWeightLogFromLocalStorage } from "./utils/utils";

const userInfo: UserInfo = getUserInfoFromLocalStorage() || new UserInfo();
userInfo.weightLog = getWeightLogFromLocalStorage();

type context<T> = { state: T; setState: Dispatch<SetStateAction<T>> };

export const preferencesContext = createContext<context<UserPreferences>>({} as context<UserPreferences>);
export const weightLogContext = createContext<context<Weight[]>>({} as context<Weight[]>);
export const userInfoContext = createContext<context<UserInfo>>({} as context<UserInfo>);

export default function App() {
  const [weightLog, setWeightLog] = useState(() => userInfo.weightLog);
  const [preferences, setPrefrences] = useState(() => userInfo.preferences);

  return (
    <preferencesContext.Provider
      value={{ state: preferences, setState: setPrefrences }}
    >
      <weightLogContext.Provider
        value={{ state: weightLog, setState: setWeightLog }}
      >
        <DashboardPage />
      </weightLogContext.Provider>
    </preferencesContext.Provider>
  );
}
