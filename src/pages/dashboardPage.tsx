import { useState } from "react";
import WeightTable from "../components/weightTableComponent";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MAX_WEIGHT_KG, MIN_WEIGHT_KG, UserPreferences, Weight } from "../../globals";
import {
  getWeightLogFromLocalStorage,
  storeWeightLogToLocalStorage,
  dateIndexInWeightArr,
  sortWeightLog,
} from "../utils/utils"

export default function DashboardPage() {
  const { control, register, handleSubmit } = useForm<Weight>();

  const [weightLog, setWeightLog] = useState(getWeightLogFromLocalStorage());

  const onWeightSubmit: SubmitHandler<Weight> = (
    submittedWeight: Weight,
  ) => {
    submittedWeight.date = new Date(submittedWeight.date);

    const dateIndexInWeightLog: number = dateIndexInWeightArr(
      submittedWeight.date,
      weightLog,
    );
    if (dateIndexInWeightLog !== -1) {
      if (confirm("date already exists! do you want to ovewrite?") === false) {
        return;
      }

      weightLog[dateIndexInWeightLog].weightKg = submittedWeight.weightKg;

      setWeightLog(() => [...weightLog]);
      return;
    }

    const updatedWeightLog = sortWeightLog([
      ...weightLog,
      submittedWeight,
    ]);

    setWeightLog(sortWeightLog(updatedWeightLog));
    storeWeightLogToLocalStorage(updatedWeightLog);
  };

  return (
    <>
      <h1 className="bg-sidibou-blue text-4xl text-center p-2">BodyTrackr</h1>
      // <WeightTable weightLog={weightLog} userPreferences={new UserPreferences()}/>

      <form onSubmit={handleSubmit(onWeightSubmit)}>
        <input
          {...register("weightKg", { required: true, max: MAX_WEIGHT_KG, min: MIN_WEIGHT_KG })}
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
        />

        <input type="submit" />
      </form>
    </>
  );
}
