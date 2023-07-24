import jwtDecode from "jwt-decode";
import { SERVER_URL, UserInfo } from "../../globals";
import { setUserInfoToServer } from "./userInfoController";

export interface UserCredentials {
  email: string;
  password: string;
}
export class LoginState {
  isLoggedIn: boolean | null;
  hasRefreshToken: boolean | null;
  accessToken: string | null;
  constructor(
    isLoggedIn: boolean | null = null,
    hasRefreshToken: boolean | null = null,
    accessToken: string | null = null,
  ) {
    this.isLoggedIn = isLoggedIn;
    this.hasRefreshToken = hasRefreshToken;
    this.accessToken = accessToken;
  }
}

export function getAccessTokenFromLocalStorage(): string | null {
  const accessToken: string | null = localStorage.getItem("accessToken");

  try {
    jwtDecode(accessToken || ""); // this throws an errror if token is invalid
    return accessToken;
  } catch (e) {
    localStorage.removeItem("accessToken");
    return null;
  }
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

export async function requestNewAccessToken(): Promise<string | null> {
  const requestURL: URL = new URL("token", SERVER_URL);

  const responseToken = await fetch(requestURL, {
    method: "GET",
    headers: {
      "mode": "cors",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": requestURL.origin,
    },
    credentials: "include",
  });

  return responseToken.status === 200
    ? (await responseToken.json()).accessToken
    : null;
}

export async function updateAccessToken(): Promise<string | null> {
  const accessToken: string | null = await requestNewAccessToken();
  if (accessToken) {
    setAccessTokenToLocalStorage(accessToken);
    return accessToken;
  }

  return null;
}

export async function handleToken(
  token: string | null,
): Promise<string | null> {
  try {
    jwtDecode(token || ""); // this throws an errror if token is invalid
    if (isTokenExpired(token as string)) return await requestNewAccessToken();
    setAccessTokenToLocalStorage(token as string);
    return token;
  } catch (e) {
    localStorage.removeItem("accessToken");
    return null;
  }
}

export async function handleLoginState(): Promise<LoginState> {
  const storedToken = getAccessTokenFromLocalStorage();
  const token : string | null = await handleToken(storedToken);

  return new LoginState(Boolean(token), Boolean(token), token);
}

export async function register(
  userInfo: UserInfo,
  accessToken: string,
): Promise<boolean> {
  try {
    await setUserInfoToServer(userInfo, accessToken);
    return true;
  } catch (e) {
    console.log("register: ", (e as Error).message);
    return false;
  }
  // start register proccess
}

export async function handleLogout(
  userInfo: UserInfo,
  accessToken: string,
): Promise<boolean> {
  const requestURL: URL = new URL("/logout", SERVER_URL);
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
  localStorage.clear();
  return response.status === 200;
}
