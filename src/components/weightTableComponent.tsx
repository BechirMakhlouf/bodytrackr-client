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
  return (
    <>
      <table className="max-w-3xl p-4 flex flex-col items-stretch space-y-4 border-2 border-white-grey rounded-[60px]">
        <thead>
          <tr className="flex text-2xl justify-around ">
            <th className="font-normal">Date</th>
            <th className="font-normal">Weight</th>
            <th className="font-normal">Difference</th>
          </tr>
        </thead>

        <tbody className="flex flex-col space-y-6">
          {props.weightLog
            .map((weight: Weight, index) => {
              const formattedDate: string = formatDate(weight.date);
              const formattedWeight: string = formatWeight(
                weight.weightKg,
                props.userPreferences.weightUnit
              );

              return (
                <tr
                  key={formattedDate}
                  className="flex justify-around text-center"
                >
                  <td className="text-center text-xl w-full text-grey-grey">
                    {formattedDate}
                  </td>
                  <td className="text-center text-xl w-full">
                    {formattedWeight}
                  </td>
                  <td
                    className={`text-center text-xl w-full ${
                      weightDiffArr[index] > 0 ? "text-sidibou-blue" : ""
                    } italic`}
                  >
                    {weightDiffArr[index].toFixed(1)}
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
