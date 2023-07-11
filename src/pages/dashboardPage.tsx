import { useState } from "react";
import WeightTable from "../components/weightTableComponent";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Weight {
  weightKg: number;
  date: Date;
}

function getWeightLogFromLocaleStorage(): Weight[] {
  const weightLog: Weight[] =
    JSON.parse(localStorage.getItem("weightLog") as string) || [];

  weightLog.forEach((weight) => (weight.date = new Date(weight.date)));

  return weightLog;
}

function sortWeightLog(weightLog: Weight[]): Weight[] {
  return weightLog.sort((a, b) => {
    a.date.setHours(0, 0, 0, 0);
    b.date.setHours(0, 0, 0, 0);

    return a.date > b.date ? -1 : 1;
  });
}

function inputWeightComponent() {
  const { control, register, handleSubmit } = useForm<Weight>();
  const [weightLog, setWeightLog] = useState(getWeightLogFromLocaleStorage());

  const onWeightSubmit: SubmitHandler<Weight> = (
    submittedWeight,
  ) => {
    submittedWeight.date = new Date(submittedWeight.date);

    const updatedWeightLog = sortWeightLog([
      ...weightLog,
      submittedWeight,
    ]);

    setWeightLog(sortWeightLog(updatedWeightLog));
    localStorage.setItem("weightLog", JSON.stringify(weightLog));
    console.log(submittedWeight);
  };

  return (
    <form onSubmit={handleSubmit(onWeightSubmit)}>
      <input
        placeholder="enter weight"
        {...register("weightKg", { required: true, max: 200, min: 10 })}
        type="text"
      />

      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <DatePicker
            placeholderText="enter a date"
            selected={field.value}
            onChange={(date: Date) => field.onChange(date)}
            maxDate={new Date()}
          />
        )}
      />
      <input type="submit" />
    </form>
  );
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

    setWeightLog(sortWeightLog(updatedWeightLog));
    localStorage.setItem("weightLog", JSON.stringify(weightLog));
    console.log(submittedWeight);
  };

  return (
    <>
      <h1 className="bg-sidibou-blue text-4xl">weight logs</h1>
      <WeightTable weightLog={weightLog} />

      <form onSubmit={handleSubmit(onWeightSubmit)}>
        <input
          {...register("weightKg", { required: true, max: 200, min: 10 })}
          type="text"
        />

        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DatePicker
              placeholderText="enter a date"
              selected={field.value}
              onChange={(date: Date) => field.onChange(date)}
              maxDate={new Date()}
            />
          )}
        />
        <input type="submit" />
      </form>
    </>
  );
}

export type { Weight };
