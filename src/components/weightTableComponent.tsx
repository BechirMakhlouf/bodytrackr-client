import { useContext, useMemo } from "react";

import WeightTableRow from "./weightTableItem";
import { Weight } from "../../globals";
import { formatDate, weightDifferenceArray } from "../utils/utils";
import { userInfoContext } from "../App";

export default function WeightTable() {
  const { state: { weightLog } } = useContext(userInfoContext);

  const weightDiffArr: number[] = useMemo<number[]>(
    () => weightDifferenceArray(weightLog),
    [weightLog]
  );

  return (
    <table className="md:m-4 p-4 w-full flex flex-col 
                  border-1 border-gray-100 rounded-[36px] custom-shadow">
      <thead>
        <tr className="flex text-xl justify-around ">
          <th className="font-normal">Date</th>
          <th className="font-normal">
            Weight<span className="text-lg">(kg)</span>
          </th>
          <th className="font-normal">Difference</th>
        </tr>
      </thead>

      <tbody className="flex flex-col">
        {weightLog
          .map((weight: Weight, index) => {
            const formattedDate: string = formatDate(weight.date);
            return (
              <WeightTableRow
                key={formattedDate}
                weight={weight}
                weightDiff={weightDiffArr[index]}
              />
            );
          })
          .reverse()}
      </tbody>
    </table>
  );
}
