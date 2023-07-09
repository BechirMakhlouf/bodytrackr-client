import { useRef } from "react";

interface Weight {
  weightKg: number;
  date: Date;
}

const weightLog: Weight[] = JSON.parse(localStorage.getItem("weightLog") as string);
// const weightLog = (localStorageWeightLog instanceof Weight) ? localStorageWeightLog : [];

console.log(weightLog);

export default function DashboardPage() {
  
  const weightInput = useRef({} as HTMLInputElement);
  const dateInput = useRef({} as HTMLInputElement);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          weightLog.push({
            weightKg: Number(weightInput.current.value),
            date: new Date(dateInput.current.value),
          });
          localStorage.setItem("weightLog", JSON.stringify(weightLog))
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
