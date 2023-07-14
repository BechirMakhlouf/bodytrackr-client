import editIcon from "../assets/edit-text.svg";
import { useMemo } from "react";
import { UserPreferences, Weight } from "../../globals";

import {
  formatDate,
  formatWeight,
  weightDifferenceArray,
} from "../utils/utils";

export default function WeightTable(props: {
  weightLog: Weight[];
  userPreferences: UserPreferences;
}) {
  const weightDiffArr: number[] = useMemo<number[]>(
    () => weightDifferenceArray(props.weightLog),
    props.weightLog
  );
  `k`;
  return (
    <>
      <table
        className="m-4 max-w-full min-w-[480px] p-4 flex flex-col items-stretch space-y-4 
                        border-1 border-gray-100 rounded-[36px] custom-shadow"
      >
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
          {props.weightLog
            .map((weight: Weight, index) => {
              const formattedDate: string = formatDate(weight.date);
              const formattedWeight: string = formatWeight(
                weight.weightKg,
                props.userPreferences.weightUnit
              );
              const formattedWeightDiff: string =
                weightDiffArr[index].toFixed(1);
              return (
                <tr
                  key={formattedDate}
                  className="group relative py-2 custom-shadow-hover flex  
                              justify-around text-center border-0 rounded-3xl"
                >
                  <td className="text-center text-base w-full text-grey-grey">
                    {formattedDate}
                  </td>
                  <td className="text-center text-base w-full">
                    {formattedWeight}
                  </td>
                  <td
                    className={`text-center text-base w-full ${
                      weightDiffArr[index] > 0 ? "text-sidibou-blue" : ""
                    } italic`}
                  >
                    {formattedWeightDiff}
                  </td>
                  <td>
                    <img
                      src={editIcon}
                      alt="edit"
                      className="absolute top-[10px] right-6 w-5 opacity-30 hidden group-hover:inline
                                hover:opacity-60 active:opacity-30"
                    />
                  </td>
                </tr>
              );
            })
            .reverse()}
        </tbody>
      </table>
    </>
  );
}
