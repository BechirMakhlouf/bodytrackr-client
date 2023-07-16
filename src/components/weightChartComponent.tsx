import { useState, useEffect, useMemo, useContext } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

import { weightLogContext } from "../App";

const WeightChart = () => {
  const [chartHeight, setChartHeight] = useState((window.innerHeight * 3) / 4);
  const {state: weightLog} = useContext(weightLogContext);
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
    if (!weightLog.length) return [0, 80];
    let minWeight = weightLog[0].weightKg;
    let maxWeight = weightLog[0].weightKg;

    for (let i = 0; i < weightLog.length; i++) {
      const weight = weightLog[i].weightKg;

      if (weight < minWeight) minWeight = weight;
      if (weight > maxWeight) maxWeight = weight;
    }

    return [minWeight, maxWeight];
  }, []);

  useEffect(() => {
    function handleHeightResize() {
      if (window.innerHeight < 800) {
        setChartHeight(Math.trunc((window.innerHeight * 3) / 4));
      }
    }
    window.addEventListener("resize", handleHeightResize);

    return window.removeEventListener("resize", handleHeightResize);
  }, []);
  return (
    <>
      <div className="lg:border lg:rounded-[36px] lg:custom-shadow lg:p-8">
        <ResponsiveContainer
          width={"100%"}
          height={chartHeight}
          className={"-translate-x-7 translate-y-4 round-[36px]"}
        >
          <AreaChart data={data}>
            {/* <ReferenceLine y={60} stroke="red" strokeDasharray="3 3" /> */}
            <Area
              type="monotone"
              dataKey={`weight`}
              strokeWidth={2}
              // dot={{ stroke: "red", strokeWidth: 2 }}
              animationDuration={1000}
            />
            <XAxis dataKey={`date`} fontSize={12} />
            <YAxis
              dataKey={`weight`}
              domain={[minWeight, maxWeight + 8]}
              fontSize={14}
            />
            <Tooltip />
            {/* <Tooltip position={{x: 200, y: 80}} active={true}/> */}
            <CartesianGrid opacity={0.4} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default WeightChart;
