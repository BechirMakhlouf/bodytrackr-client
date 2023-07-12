import { Unit, UserPreferences, Weight } from "../../globals";
import { weightKgtoLbs } from "../utils/utils";

function formatDate(date: Date): string {
  return date.toDateString();
}

function formatWeight(weightKg: number, unit: Unit): string {
  return (unit === Unit.Imperial ? weightKgtoLbs(weightKg) : weightKg)
    .toPrecision(1);
}

export default function WeightTable(
  props: { weightLog: Weight[]; userPreferences: UserPreferences },
) {
  return (
    <>
      <table className="w-full border-black border-2">
        <thead>
          <tr>
            <th>Weight</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {props.weightLog.map((weight: Weight) => {
            const formattedDate: string = formatDate(weight.date);
            const formattedWeight: string = formatWeight(
              weight.weightKg,
              props.userPreferences.weightUnit,
            );

            return (
              <tr key={formattedDate}>
                <td className="text-center">{formattedWeight}</td>
                <td className="text-center">{formattedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
