import { createContext } from "react";
import { UserInfo, UserPreferences } from "../globals";
import DashboardPage from "./pages/dashboardPage";
import { getUserInfoFromLocalStorage } from "./utils/utils";

const userInfo: UserInfo = getUserInfoFromLocalStorage() || new UserInfo();

export const preferencesContext = createContext<UserPreferences>(
  userInfo.preferences,
);
export const userInfoContext = createContext<UserInfo>(userInfo);

export default function App() {
  return (
    <preferencesContext.Provider value={userInfo.preferences}>
      <DashboardPage />
    </preferencesContext.Provider>
  );
}
