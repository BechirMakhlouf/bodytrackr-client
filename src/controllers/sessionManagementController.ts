import jwtDecode from "jwt-decode";
import { SERVER_URL, UserInfo } from "../../globals";
import { setUserInfoToServer } from "./userInfoController";

export interface UserCredentials {
  email: string;
  password: string;
}

interface UserCredentialswithCaptcha extends UserCredentials {
  captchaToken: string;
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
  userCredentialsWithCaptcha: UserCredentialswithCaptcha,
  endPoint: "login" | "register",
): Promise<string | null> {
  const requestURL: URL = new URL(endPoint, SERVER_URL);
  console.log("endpoint: ", endPoint)
  const tokensResponse = await fetch(requestURL, {
    method: "POST",
    headers: {
      "mode": "cors",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": SERVER_URL.origin,
    },
    credentials: "include",
    body: JSON.stringify(userCredentialsWithCaptcha),
  });
  return tokensResponse.status === 200
    ? (await tokensResponse.json()).accessToken
    : null;
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
    jwtDecode(token || ""); // this throws an error if token is invalid
    if (isTokenExpired(token as string)) return await requestNewAccessToken();
    return token;
  } catch (e) {
    const newAccessToken: string | null = await requestNewAccessToken();
    if (newAccessToken) {
      return newAccessToken;
    }
    return null;
  }
}

export async function handleLoginState(
  token?: string | null,
): Promise<LoginState> {
  token = token || getAccessTokenFromLocalStorage();
  const verifiedToken: string | null = await handleToken(token);

  return new LoginState(
    Boolean(verifiedToken),
    Boolean(verifiedToken),
    verifiedToken,
  );
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
      "Authorization": `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: JSON.stringify(userInfo),
  });

  if (response.status === 200) {
    localStorage.removeItem("loggedInUserInfo")
    return true;
  }

  return false;
}
