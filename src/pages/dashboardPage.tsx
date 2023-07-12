import { useState } from "react";
import WeightTable from "../components/weightTableComponent";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Weight } from "../../globals";

function getWeightLogFromLocaleStorage(): Weight[] {
  const weightLog: Weight[] =
    JSON.parse(localStorage.getItem("weightLog") as string) || [];

  weightLog.forEach((weight) => (weight.date = new Date(weight.date)));

  return weightLog;
}
let recursiveFunction = function (arr, x, start, end) {
  // Base Condition
  if (start > end) return false;

  // Find the middle index
  let mid = Math.floor((start + end) / 2);

  // Compare mid with given key x
  if (arr[mid] === x) return true;

  // If element at mid is greater than x,
  // search in the left half of mid
  if (arr[mid] > x) {
    return recursiveFunction(arr, x, start, mid - 1);
  } // If element at mid is smaller than x,
  // search in the right half of mid
  else {
    return recursiveFunction(arr, x, mid + 1, end);
  }
};
function DoesDateExistInWeightLog(
  date: Date,
  weightLog: Weight[],
  start: number = 0,
  end: number = weightLog.length - 1,
): boolean {
  
  console.log(start, end);
  // Base Condition
  if (start > end) return false;

  // Find the middle index
  let mid = Math.floor((start + end) / 2);

  // Compare mid with given key x
  if (weightLog[mid].date.toDateString() === date.toDateString()) return true;

  // If element at mid is greater than x,
  // search in the left half of mid
  if (weightLog[mid].date > date) {
    return DoesDateExistInWeightLog(date, weightLog, start, mid - 1);
  } // If element at mid is smaller than x,
  // search in the right half of mid
  else {
    return DoesDateExistInWeightLog(date, weightLog, mid + 1, end);
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

    return a.date > b.date ? -1 : 1;
  });
}

export default function DashboardPage() {
  const { control, register, handleSubmit } = useForm<Weight>();
  // const [startDate, setStartDate] = useState(new Date());

  const [weightLog, setWeightLog] = useState(getWeightLogFromLocaleStorage());

  const onWeightSubmit: SubmitHandler<Weight> = (
    submittedWeight,
  ) => {

    submittedWeight.date = new Date(submittedWeight.date);
    const updatedWeightLog = sortWeightLog([
      ...weightLog,
      submittedWeight,
    ]);
    console.log(submittedWeight.date)
    console.log(DoesDateExistInWeightLog(submittedWeight.date, weightLog))
    // setWeightLog(sortWeightLog(updatedWeightLog));
    // localStorage.setItem("weightLog", JSON.stringify(weightLog));
    console.log(submittedWeight);
  };

  return (
    <>
      <h1 className="bg-sidibou-blue text-4xl">weight logs</h1>
      <WeightTable weightLog={weightLog} />

      <form onSubmit={handleSubmit(onWeightSubmit)}>
        <input
          {...register("weightKg", { required: true, max: 200, min: 10 })}
          className="border-1 border-black"
          type="number"
          placeholder="enter weight"
        />

        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DatePicker
              className="border-1 border-black"
              placeholderText="enter a date"
              selected={field.value}
              onChange={(date: Date) => field.onChange(date)}
              maxDate={new Date()}
              required
            />
          )}
          rules={{}}
        />

        <input type="submit" />
      </form>
    </>
  );
}
