import { SERVER_URL, UserInfo } from "../../globals";
import { isUserInfo } from "../utils/utils";

export async function getUserInfoFromServer(
  accessToken: string,
): Promise<UserInfo | null> {
  const requestURL: URL = new URL("/userinfo", SERVER_URL);

  const userInfoResponse = await fetch(requestURL, {
    method: "GET",
    headers: {
      "mode": "cors",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": SERVER_URL.origin,
      "Authorization": `Bearer ${accessToken}`,
    },
  });
  if (userInfoResponse.status !== 200) return null;

  const receivedUserInfo: any = await userInfoResponse.json();

  if (!isUserInfo(receivedUserInfo)) {
    console.log("userInfo received is invalid");
    return null;
  };
  
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
  const requestURL: URL = new URL("/userinfo", SERVER_URL);
  const response = await fetch(requestURL, {
    method: "POST",
    headers: {
      "mode": "cors",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": SERVER_URL.origin,
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify(userInfo),
  });

  return response.status === 200;
}
