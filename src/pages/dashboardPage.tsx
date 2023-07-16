import { useContext, useState } from "react";

import WeightTable from "../components/weightTableComponent";
import WeightChart from "../components/weightChartComponent";
import Header from "../components/headerComponent";
import AddWeightButton from "../components/AddWeightButtonComponent";
import { preferencesContext } from "../App";
import { getWeightLogFromLocalStorage } from "../utils/utils";

export default function DashboardPage() {
  const preferences = useContext(preferencesContext);
  // const userInfo = useContext(userInfoContext);

  const [weightLog, setWeightLog] = useState(getWeightLogFromLocalStorage());

  return (
    <>
      <Header />

      <div className="md:flex">
        <div className="lg:w-2/3">
          <WeightChart weightLog={weightLog} />
        </div>
        <div className="lg:w-1/3">
          <WeightTable
            weightLog={weightLog}
            userPreferences={preferences}
            setWeightLog={setWeightLog}
          />
        </div>
      </div>

      <AddWeightButton weightLog={weightLog} setWeightLog={setWeightLog} />
    </>
  );
}
