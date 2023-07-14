import { Weight } from "../../globals";
import { Area, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Tooltip } from "recharts";

const WeightChart = (props: { weightLog: Weight[] }) => {
  const data = props.weightLog.map((weight) => {
    return {
      date: weight.date.toLocaleDateString(),
      weight: weight.weightKg,
    }
  });
  return (
    <>
      <ResponsiveContainer width={`100%`} height={500}>
        <LineChart data={data}>
          <Line dataKey={`weight`}/>
          <XAxis dataKey={`date`}/>
          <YAxis dataKey={`weight`}/>
          <Tooltip />
          <CartesianGrid opacity={0.4} vertical={false}/>
        </LineChart>
        
      </ResponsiveContainer>
    </>
  );
};

export default WeightChart;
