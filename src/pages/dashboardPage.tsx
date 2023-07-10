import { useRef } from "react";
import WeightTable from "../components/weightTableComponent";

interface Weight {
  weightKg: number;
  date: Date;
}

const weightLog: Weight[] =
  JSON.parse(localStorage.getItem("weightLog") as string) || [];

export default function DashboardPage() {
  const weightInput = useRef({} as HTMLInputElement);
  const dateInput = useRef({} as HTMLInputElement);

  return (
    <>
      <h1 className="bg-sidibou-blue text-4xl">hello world</h1>
      <WeightTable weightLog={weightLog}/>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          weightLog.push({
            weightKg: Number(weightInput.current.value),
            date: new Date(dateInput.current.value),
          });

          localStorage.setItem("weightLog", JSON.stringify(weightLog));
          console.log(weightLog);
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
