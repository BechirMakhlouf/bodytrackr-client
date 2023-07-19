import jwt from "jsonwebtoken";

interface UserCredentials {
  email: string;
  password: string;
}

interface Tokens {
  sessionToken: string;
  refreshToken: string;
}
// change EXPORT
export async function sendCredentials(
  userCredentials: UserCredentials,
  endPoint: "login" | "register",
): Promise<Tokens | null> {
  try {
    const requestURL: URL = new URL(endPoint, import.meta.env.VITE_SERVER_URL);

    const tokens = await fetch(requestURL, {
      method: "POST",
      headers: {
        "mode": "cors",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });
    console.log(await tokens.json());

    return await tokens.json();
  } catch (e) {
    return null;
  }
}
export function getSessionTokenFromLocalStorage(): jwt.JwtPayload | null {
  return jwt.decode(localStorage.getItem("sessionToken") as string) as
    | jwt.JwtPayload
    | null;
}
export function checkSession() {
  const sessionToken = getSessionTokenFromLocalStorage();
  if (sessionToken) {
    sessionToken.getExpiresAt();
  }
}
