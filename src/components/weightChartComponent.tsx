import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
  AreaChart,
  Area,
} from "recharts";

import { Weight } from "../../globals";

const WeightChart = (props: { weightLog: Weight[] }) => {
  const weightLog = props.weightLog;
  const data = useMemo(
    () =>
      weightLog.map((weight) => {
        return {
          date: weight.date.toLocaleDateString(),
          weight: weight.weightKg,
        };
      }),
    [weightLog]
  );
  const [minWeight, maxWeight] = useMemo(() => {
    let minWeight = weightLog[0].weightKg;
    let maxWeight = weightLog[0].weightKg;

    for (let i = 0; i < weightLog.length; i++) {
      const weight = weightLog[i].weightKg;

      if (weight < minWeight) minWeight = weight;
      if (weight > maxWeight) maxWeight = weight;
    }

    return [minWeight, maxWeight];
  }, []);
  return (
    <>
      <div className="lg:border lg:rounded-[36px] lg:custom-shadow">
        <ResponsiveContainer
          width={1200}
          height={500}
          className={"-translate-x-7 translate-y-4 round-[36px]"}
        >
          <AreaChart height={500} width={1200} data={data}>
            {/* <ReferenceLine y={60} stroke="red" strokeDasharray="3 3" /> */}
            <Area type="monotone" dataKey={`weight`} strokeWidth={2} />
            <XAxis dataKey={`date`} fontSize={12} />
            <YAxis
              dataKey={`weight`}
              domain={[minWeight, maxWeight + 8]}
              fontSize={14}
            />
            <CartesianGrid opacity={0.4} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default WeightChart;
