import { SERVER_URL, UserInfo } from "../../globals";
import { isUserInfo } from "../utils/utils";
import { handleToken, requestNewAccessToken } from "./sessionManagementController";

export function getUserInfo(isLoggedIn: boolean): UserInfo | null {
  const storedUserInfo: any = JSON.parse(
    localStorage.getItem("userInfo") || "{}",
  );

  if (!isUserInfo(storedUserInfo)) {
    console.log(storedUserInfo);
    return null;
  }

  storedUserInfo.heightCm = Number(storedUserInfo.heightCm);
  storedUserInfo.birthYear = Number(storedUserInfo.birthYear);
  storedUserInfo.goalWeight = Number(storedUserInfo.goalWeight);
  storedUserInfo.preferences.darkMode = Boolean(
    storedUserInfo.preferences.darkMode,
  );
  storedUserInfo.weightLog.forEach((weight) => {
    weight.date = new Date(weight.date);
    weight.weightKg = Number(weight.weightKg);
  });

  const userInfo: UserInfo = new UserInfo(
    storedUserInfo.name,
    storedUserInfo.firstName,
    storedUserInfo.email,
    storedUserInfo.sex,
    storedUserInfo.heightCm,
    storedUserInfo.birthYear,
    storedUserInfo.goalWeight,
    { ...storedUserInfo.preferences },
    [...storedUserInfo.weightLog],
  );

  return userInfo;
}

export async function storeUserInfo(userInfo: UserInfo, isLoggedIn: boolean) {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

export async function getUserInfoFromServer(
  accessToken: string,
): Promise<UserInfo | null> {
  const token = await handleToken(accessToken)
  if (!token) return null;

  const requestURL: URL = new URL("/userinfo", SERVER_URL);

  const userInfoResponse = await fetch(requestURL, {
    method: "GET",
    headers: {
      "mode": "cors",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": SERVER_URL.origin,
      "Authorization": `Bearer ${token}`,
    },
  });

  const receivedUserInfo: any = await userInfoResponse.json();

  if (!isUserInfo(receivedUserInfo)) {
    console.log("userInfo received is invalid");
    return null;
  }

  receivedUserInfo.heightCm = Number(receivedUserInfo.heightCm);
  receivedUserInfo.birthYear = Number(receivedUserInfo.birthYear);
  receivedUserInfo.goalWeight = Number(receivedUserInfo.goalWeight);
  receivedUserInfo.preferences.darkMode = Boolean(
    receivedUserInfo.preferences.darkMode,
  );
  receivedUserInfo.weightLog.forEach((weight) => {
    weight.date = new Date(weight.date);
    weight.weightKg = Number(weight.weightKg);
  });

  const userInfo: UserInfo = new UserInfo(
    receivedUserInfo.name,
    receivedUserInfo.firstName,
    receivedUserInfo.email,
    receivedUserInfo.sex,
    receivedUserInfo.heightCm,
    receivedUserInfo.birthYear,
    receivedUserInfo.goalWeight,
    { ...receivedUserInfo.preferences },
    [...receivedUserInfo.weightLog],
  );

  return userInfo;
}

export async function setUserInfoToServer(
  userInfo: UserInfo,
  accessToken: string,
): Promise<boolean> {
  const token = await handleToken(accessToken)
  if (!token) return false;

  const requestURL: URL = new URL("/userinfo", SERVER_URL);
  const response = await fetch(requestURL, {
    method: "POST",
    headers: {
      "mode": "cors",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": SERVER_URL.origin,
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(userInfo),
  });

  return response.status === 200;
}
