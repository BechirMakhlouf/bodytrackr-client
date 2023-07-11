import { useRef, useState } from "react";
import WeightTable from "../components/weightTableComponent";

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
export default function DashboardPage() {
  const [weightLog, setWeightLog] = useState(getWeightLogFromLocaleStorage());
  const weightInput = useRef({} as HTMLInputElement);
  const dateInput = useRef({} as HTMLInputElement);

  return (
    <>
      <h1 className="bg-sidibou-blue text-4xl">hello world</h1>
      <WeightTable weightLog={weightLog} />

      <form
        onSubmit={(e) => {
          e.preventDefault();

          const submittedWeight: Weight = {
            weightKg: Number(weightInput.current.value),
            date: new Date(dateInput.current.value),
          };
          const updatedWeightLog = sortWeightLog([
            ...weightLog,
            submittedWeight,
          ]);

          localStorage.setItem("weightLog", JSON.stringify(weightLog));

          setWeightLog(() => updatedWeightLog);
        }}
      >
        <input ref={weightInput} type="number" name="weight" />
        <input ref={dateInput} type="date" name="date" />

        <button type="submit">submit</button>
      </form>
    </>
  );
}

export type { Weight };
