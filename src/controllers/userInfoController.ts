import { SERVER_URL, UserInfo } from "../../globals";
import { getAccessTokenFromLocalStorage } from "./sessionManagementController";

export async function getUserInfoFromServer(): Promise<UserInfo | Error> {
  try {
    const requestURL: URL = new URL("/userinfo", SERVER_URL);

    const userInfo = await fetch(requestURL, {
      method: "GET",
      headers: {
        "mode": "cors",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": SERVER_URL.origin,
        "Authorization": `Bearer ${getAccessTokenFromLocalStorage()}`,
      },
    });

    return await userInfo.json();
  } catch (e) {

    return new Error((e as Error).message);
  }
}

export async function setUserInfoToServer(userInfo: UserInfo): Promise<boolean | Error> {
  try {
    const requestURL: URL = new URL("/userinfo", SERVER_URL);
    await fetch(requestURL, {
      method: "POST",
      headers: {
        "mode": "cors",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": SERVER_URL.origin,
        "Authorization": `Bearer ${getAccessTokenFromLocalStorage()}`,
      },
      body: JSON.stringify(userInfo),
    });
    return true;
  } catch (e) {
    return new Error((e as Error).message);
  }
}
