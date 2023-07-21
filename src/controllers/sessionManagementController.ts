import jwtDecode from "jwt-decode";
import { UserInfo } from "../../globals";
import { SERVER_URL } from "../../globals";
import { setUserInfoToServer } from "./userInfoController";

export interface UserCredentials {
  email: string;
  password: string;
}

export function getAccessTokenFromLocalStorage(): string | null {
  const accessToken: string | null = localStorage.getItem("accessToken");
  return accessToken;
}

export function setAccessTokenToLocalStorage(accessToken: string) {
  localStorage.setItemItem("accessToken", accessToken);
}

export async function sendCredentials(
  userCredentials: UserCredentials,
  endPoint: "login" | "register",
): Promise<string | null> {
  try {
    const requestURL: URL = new URL(endPoint, SERVER_URL);
    const tokens = await fetch(requestURL, {
      method: "POST",
      headers: {
        "mode": "cors",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": SERVER_URL.origin,
      },
      credentials: "include",
      body: JSON.stringify(userCredentials),
    });

    return (await tokens.json()).accessToken;
  } catch (e) {
    return null;
  }
}

export async function requestNewAccessToken(): Promise<string> {
  try {
    const requestURL: URL = new URL("token", SERVER_URL);

    const tokens = await fetch(requestURL, {
      method: "GET",
      headers: {
        "mode": "cors",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": requestURL.origin,
      },
      credentials: "include",
    });

    return (await tokens.json()).accessToken;
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export async function updateAccessToken(): Promise<void> {
  const accessToken: string = await requestNewAccessToken();
  setAccessTokenToLocalStorage(accessToken);
}

export async function checkIfLoggedIn(): Promise<boolean> {
  const accessToken = getAccessTokenFromLocalStorage();
  try {
    if (!accessToken) {
      await updateAccessToken();
      return true;
    }

    const { exp: accessTokenExpireTime } = jwtDecode<any>(accessToken);
    if (accessTokenExpireTime * 1000 - Date.now() <= 0) {
      localStorage.removeItem("accessToken");
      await updateAccessToken();
      return true;
    }
  } catch (e) {
    console.log("isLoggedIn: ", (e as Error).message);
  }
  return false;
}

export async function register(userInfo: UserInfo): Promise<boolean> {
  try {
    await setUserInfoToServer(userInfo);
    return true;
  } catch (e) {
    console.log("register: ", (e as Error).message)
    return false;
  }
  // start register proccess
}

export function logout() {
  localStorage.clear();
  // redirect to logIn Page
}
