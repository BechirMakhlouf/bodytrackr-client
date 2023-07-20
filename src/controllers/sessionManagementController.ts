import { UserInfo } from "../../globals";
import { SERVER_URL } from "../../globals";
import { setUserInfoToServer } from "./userInfoController";

export interface UserCredentials {
  email: string;
  password: string;
}

export function getAccessTokenFromLocalStorage(): string {
  const sessionToken: string | null = localStorage.getItem("sessionToken");
  if (!sessionToken) {
    throw new Error("sessionToken not found in localStorage");
  }
  return sessionToken;
}

export function setAccessTokenToLocalStorage(sessionToken: string) {
  localStorage.setItemItem("sessionToken", sessionToken);
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

    return (await tokens.json()).sessionToken;
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

    return (await tokens.json()).sessionToken;
  } catch (e) {
    throw new Error((e as Error).message)
  }
}

export async function updateStoredSessionToken(): Promise<void> {
  const accessToken: string = await requestNewAccessToken();
  setAccessTokenToLocalStorage(accessToken);
}

export async function register(userInfo: UserInfo) {
  await setUserInfoToServer(userInfo) 
  // start register proccess
}

export function logout() {
  localStorage.clear();
  // redirect to logIn Page
}
