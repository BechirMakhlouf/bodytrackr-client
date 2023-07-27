import { Dispatch, SetStateAction, useState } from "react";

import { UserInfo } from "../../globals";
import { getUserInfoFromServer } from "../controllers/userInfoController";
import {
  LoginState,
  updateAccessToken,
} from "../controllers/sessionManagementController";

let userInfoServer: UserInfo;

const accessToken = await updateAccessToken();

if (accessToken) {
  userInfoServer = await getUserInfoFromServer(accessToken) as UserInfo;

} else {

}

export default function useUserInfo(loginState: LoginState): [
  UserInfo,
  Dispatch<SetStateAction<UserInfo>>,
] {
  loginState;
  const [userInfo, setUserInfo] = useState(userInfoServer as UserInfo);
  return [userInfo, setUserInfo];
}
