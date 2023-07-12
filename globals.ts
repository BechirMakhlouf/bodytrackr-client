export const SERVER_URL: string = "http://127.0.0.1:6969/";

export interface Weight {
  weightKg: number;
  date: Date;
}

export interface UserInfo {
  name?: string;
  firstName?: string;
  email: string;
  sex?: "male" | "female" | "other";
  heightCm?: number;
  birthYear?: number;
  preferences?: {
    weightUnit?: "metric" | "imperial";
    lengthUnit?: "metric" | "imperial";
    darkMode?: boolean;
  };
  weightLog: Weight[];
}
