import { Weight } from "../pages/dashboardPage";

export default function WeightTable(props: { weightLog: Weight[] }) {
  
  return (
      <table>
        <th>
          <td>hello</td>
          <td>there</td>
        </th>
        {props.weightLog.map((weight, i) => { 
          console.log(weight);
          const time = weight.date.toString().split("T")[0];
          return (
            <tr key={i}>
              <td>{weight.weightKg}</td>
              <td>{`${time}`}</td>
            </tr>
          ); 

        })}
      </table>
  );
}