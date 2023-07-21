import { useState } from "react";
import { checkIfLoggedIn } from "../controllers/sessionManagementController";

export function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | Error>(null);
  (async () => {
    try {
      if (await checkIfLoggedIn()) {
        setIsLoggedIn(true);
        setIsLoading(false);
      }
    } catch (e) {
      setError(e as Error);
    }
  })();

  checkIfLoggedIn();
  return [isLoggedIn, isLoading, error];
}
