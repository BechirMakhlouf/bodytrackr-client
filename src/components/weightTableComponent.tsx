import { Weight } from "../../globals";


export default function WeightTable(props: { weightLog: Weight[] }) {
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
          {props.weightLog.map((weight) => {
            const formattedDate = weight.date.toLocaleDateString();
            return (
              <tr key={formattedDate}>
                <td className="text-center">{weight.weightKg}</td>
                <td className="text-center">{formattedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
