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
  localStorage.setItem("accessToken", accessToken);
}

export function isTokenExpired(token: string): boolean {
  const { exp: tokenExpireTime } = jwtDecode<any>(token);

  return tokenExpireTime * 1000 - Date.now() <= 0;
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

  if (accessToken) {
    setAccessTokenToLocalStorage(accessToken);
  }
}

export async function checkIfLoggedIn(): Promise<boolean> {
  const accessToken = getAccessTokenFromLocalStorage();
  try {
    if (!accessToken || isTokenExpired(accessToken)) {
      await updateAccessToken();
      // throw new Error("access doesn't work");
    }
    return true;
  } catch (e) {
    console.log(e);
  }
  return false;
}

export async function register(userInfo: UserInfo): Promise<boolean> {
  try {
    await setUserInfoToServer(userInfo);
    return true;
  } catch (e) {
    console.log("register: ", (e as Error).message);
    return false;
  }
  // start register proccess
}

export function logout() {
  localStorage.clear();
  // redirect to logIn Page
}
