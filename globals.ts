export const SERVER_URL: string = "http://127.0.0.1:6969/";

export const MIN_WEIGHT_KG: number = 0;
export const MAX_WEIGHT_KG: number = 1000;

export interface Weight {
  weightKg: number;
  date: Date;
}

// export type Units = "metric" | "imperial";
export enum Unit  {
  Metric,
  Imperial,
}

export enum Sex {
  Male,
  Female,
  Other,
}

export interface IUserPreferences {
  weightUnit?: Unit;
  lengthUnit?: Unit;
  darkMode?: boolean;
}
export class UserPreferences implements IUserPreferences {
  weightUnit: Unit;
  lengthUnit: Unit;
  darkMode: boolean;

  constructor(
    weightUnit: Unit = Unit.Metric,
    lengthUnit: Unit = Unit.Metric,
    darkMode: boolean = true,
  ) {
    this.weightUnit = weightUnit;
    this.lengthUnit = lengthUnit;
    this.darkMode = darkMode;
  }
}

export interface IUserInfo {
  name?: string;
  firstName?: string;
  email: string;
  sex?: Sex;
  heightCm?: number;
  birthYear?: number;
  preferences?: IUserPreferences;
  weightLog: Weight[];
}

export class UserInfo implements IUserInfo {
  name: string;
  firstName: string;
  email: string;
  sex: Sex;
  heightCm: number;
  birthYear: number;
  preferences: IUserPreferences;
  weightLog: Weight[];

  constructor(
    name: string = "",
    firstName: string = "",
    email: string = "",
    sex: Sex = Sex.Other,
    heightCm: number,
    birthYear: number,
    preferences: IUserPreferences,
    weightLog: Weight[],
  ) {
    this.name = name;
    this.firstName = firstName;
    this.email = email;
    this.sex = sex;
    this.heightCm = heightCm;
    this.birthYear = birthYear;
    this.preferences = preferences;
    this.weightLog = weightLog;
  }
}
