import { useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { preferencesContext, userInfoContext } from "../App";
import WeightTable from "../components/weightTableComponent";
import WeightChart from "../components/weightChartComponent";
import Header from "../components/headerComponent";
import { MAX_WEIGHT_KG, MIN_WEIGHT_KG, Weight } from "../../globals";
import {
  dateIndexInWeightArr,
  getWeightLogFromLocalStorage,
  sortWeightLog,
  storeWeightLogToLocalStorage,
} from "../utils/utils";

export default function DashboardPage() {
  const preferences = useContext(preferencesContext);
  const userInfo = useContext(userInfoContext);

  const { control, register, handleSubmit } = useForm<Weight>();

  const [weightLog, setWeightLog] = useState(getWeightLogFromLocalStorage());

  const onWeightSubmit: SubmitHandler<Weight> = (submittedWeight: Weight) => {
    submittedWeight.date = new Date(submittedWeight.date);

    const dateIndexInWeightLog: number = dateIndexInWeightArr(
      submittedWeight.date,
      weightLog
    );
    if (dateIndexInWeightLog !== -1) {
      if (
        confirm("date already exists! do you want to ovewrite it?") === false
      ) {
        return;
      }

      weightLog[dateIndexInWeightLog].weightKg = submittedWeight.weightKg;

      setWeightLog(() => [...weightLog]);
      return;
    }

    const updatedWeightLog = sortWeightLog([...weightLog, submittedWeight]);

    setWeightLog(sortWeightLog(updatedWeightLog));
    storeWeightLogToLocalStorage(updatedWeightLog);
  };

  return (
    <>
     <Header />

      <div className="flex flex-wrap m-4">
        <div className="w-2/3 p-16 custom-shadow rounded-[48px]">
          <WeightChart weightLog={weightLog} />
        </div>
        <div className="flex flex-wrap justify-center w-1/3">
          <WeightTable weightLog={weightLog} userPreferences={preferences} />
        </div>
      </div>

      <form onSubmit={handleSubmit(onWeightSubmit)}>
        <input
          {...register("weightKg", {
            required: true,
            max: MAX_WEIGHT_KG,
            min: MIN_WEIGHT_KG,
          })}
          className="border-1 border-black"
          type="number"
          step={0.1}
          min={MIN_WEIGHT_KG}
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
