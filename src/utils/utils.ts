import { Unit, UserInfo, Weight } from "../../globals";

function getWeightLogFromLocalStorage(): Weight[] {
  const weightLog: Weight[] =
    JSON.parse(localStorage.getItem("weightLog") as string) || [];

  weightLog.forEach((weight) => {
    weight.date = new Date(weight.date);
    weight.weightKg = Number(weight.weightKg);
  });

  return weightLog;
}

// update this
function isWeightArrValid(weightArr: Weight[]): boolean {
  for (let weight of weightArr) {
    if (
      weight.date.getTime() > new Date().getTime() ||
      weight.weightKg <= 20 ||
      weight.weightKg >= 250
    ) {
      return false;
    }
  }
  return true;
}

function dateIndexInWeightArr(
  date: Date,
  weightLog: Weight[],
  start: number = 0,
  end: number = weightLog.length - 1
): number {
  if (start > end) return -1;

  console.log(start, end);
  let mid = Math.floor((start + end) / 2);

  if (weightLog[mid].date.toISOString() === date.toISOString()) return mid;

  if (weightLog[mid].date.getTime() > date.getTime()) {
    return dateIndexInWeightArr(date, weightLog, start, mid - 1);
  } else {
    return dateIndexInWeightArr(date, weightLog, mid + 1, end);
  }
}

function storeWeightLogToLocalStorage(weightLog: Weight[]): unknown {
  try {
    localStorage.setItem("weightLog", JSON.stringify(weightLog));
  } catch (error) {
    return error;
  }
}

function sortWeightLog(weightLog: Weight[]): Weight[] {
  return weightLog.sort((a, b) => {
    a.date.setHours(0, 0, 0, 0);
    b.date.setHours(0, 0, 0, 0);

    return a.date > b.date ? 1 : -1;
  });
}

function getUserInfoFromLocalStorage(): UserInfo | undefined {
  const userInfo: UserInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  // check userInfo integrity
  if (!userInfo) {
    return undefined;
  }

  return userInfo;
}

function storeUserInfoToLocalStorage(userInfo: UserInfo) {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

function weightKgtoLbs(weightKg: number): number {
  return weightKg * 2.20462262185;
}

function weightLbsToKg(weightLbs: number): number {
  return weightLbs * 0.45359237;
}

function cmToFeet(lengthCm: number): number {
  return lengthCm * 0.032808;
}

function feetToCm(lengthFeet: number): number {
  return lengthFeet * 30.48;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

function formatWeight(weightKg: number, unit: Unit): string {
  const weightValue: number =
    unit === Unit.Imperial ? weightKgtoLbs(weightKg) : weightKg;

  return Number(weightValue).toFixed(1);
}

function weightDifferenceArray(weightArr: Weight[]): number[] {
  return weightArr.map((weight, index, weightArr) => {
    if (index) {
      return weight.weightKg - weightArr[index - 1].weightKg;
    } else {
      return 0;
    }
  });
}


export {
  cmToFeet,
  dateIndexInWeightArr,
  feetToCm,
  formatDate,
  formatWeight,
  getUserInfoFromLocalStorage,
  getWeightLogFromLocalStorage,
  isWeightArrValid,
  storeUserInfoToLocalStorage,
  sortWeightLog,
  storeWeightLogToLocalStorage,
  weightKgtoLbs,
  weightLbsToKg,
  weightDifferenceArray,
};
