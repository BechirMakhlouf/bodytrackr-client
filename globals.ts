export const SERVER_URL: URL = new URL(import.meta.env.VITE_SERVER_URL);
export const MIN_WEIGHT_KG: number = 0;
export const MAX_WEIGHT_KG: number = 1000;

export enum Unit {
  Metric = "metric",
  Imperial = "imperial",
}

export enum Sex {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Weight {
  weightKg: number;
  date: Date;
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
    darkMode: boolean = true
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
  goalWeight?: number;
  preferences: UserPreferences;
  weightLog: Weight[];
}

export class UserInfo {
  name: string;
  firstName: string;
  email: string;
  sex: Sex;
  heightCm: number;
  birthYear: number;
  goalWeight: number;
  preferences: UserPreferences;
  weightLog: Weight[];

  constructor(
    name: string = "",
    firstName: string = "",
    email: string = "",
    sex: Sex = Sex.Other,
    heightCm: number = 0,
    birthYear: number = 0,
    goalWeight: number = 0,
    preferences: UserPreferences = new UserPreferences(),
    weightLog: Weight[] = []
  ) {
    this.name = name;
    this.firstName = firstName;
    this.email = email;
    this.sex = sex;
    this.heightCm = heightCm;
    this.birthYear = birthYear;
    this.preferences = preferences;
    this.weightLog = weightLog;
    this.goalWeight = goalWeight;
  }
}
