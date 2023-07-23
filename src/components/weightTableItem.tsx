import { useContext, useState } from "react";
import DatePicker from "react-datepicker";

import editIcon from "../assets/edit-text.svg";
import xmarkIcon from "../assets/xmark-solid.svg";
import checkIcon from "../assets/check-solid.svg";

import { MAX_WEIGHT_KG, MIN_WEIGHT_KG } from "../../globals";
import { Weight } from "../../globals";
import { formatDate, formatWeight, sortWeightLog } from "../utils/utils";
import { userInfoContext } from "../App";

export default function WeightTableRow(props: {
  weight: Weight;
  weightDiff: number;
}) {
  const [weight, setWeight] = useState(props.weight);
  const [isEditable, setIsEditable] = useState(false);
  const {
    state: {
      preferences: { weightUnit },
    },
    setState: setUserInfo,
  } = useContext(userInfoContext);
  // const { setState: setWeightLog } = useContext(weightLogContext);

  const weightDiff = props.weightDiff;

  const formattedDate: string = formatDate(weight.date);
  const formattedWeight: string = formatWeight(weight.weightKg, weightUnit);
  const formattedWeightDiff: string = weightDiff.toFixed(1);
  return (
    <tr
      key={formattedDate}
      className={`group relative py-2 ${
        isEditable ? "custom-shadow-active" : "custom-shadow-hover"
      } flex justify-around text-center border-0 rounded-3xl`}
    >
      <td className="w-full text-center text-base text-grey-grey">
        {isEditable ? (
          <DatePicker
            className="border-1 border-black w-full text-center"
            onChange={(date: Date) =>
              setWeight({ weightKg: weight.weightKg, date: date })
            }
            selected={weight.date}
            maxDate={new Date()}
          />
        ) : (
          formattedDate
        )}
      </td>
      <td className="w-full text-center text-base ">
        {isEditable ? (
          <input
            required={true}
            max={MAX_WEIGHT_KG}
            min={MIN_WEIGHT_KG}
            className="border-1 border-black text-center"
            defaultValue={weight.weightKg}
            onChange={(e) =>
              setWeight({ weightKg: +e.target.value, date: weight.date })
            }
            type="number"
            step={0.2}
            placeholder="enter weight"
          />
        ) : (
          formattedWeight
        )}
      </td>
      <td
        className={`text-center text-base w-full ${
          weightDiff > 0 ? "text-sidibou-blue" : ""
        } italic`}
      >
        {formattedWeightDiff}
      </td>
      <td>
        {isEditable ? (
          <div className="flex absolute top-[10px] right-10 w-5">
            <img
              src={checkIcon}
              alt="confirm-edit"
              className="opacity-30 hidden group-hover:inline hover:opacity-60 active:opacity-30"
              onClick={(e) => {
                e.stopPropagation();

                const weightInWeightLog = props.weight;
                weightInWeightLog.weightKg = weight.weightKg;
                weightInWeightLog.date = weight.date;
                // setWeightLog((prevWeightLog) => {
                //   return [...sortWeightLog(prevWeightLog)];
                // });
                setUserInfo((prevUserInfo) => ({
                  ...prevUserInfo,
                  weightLog: [...sortWeightLog(prevUserInfo.weightLog)],
                }));

                setIsEditable(false);
              }}
            />
            <img
              src={xmarkIcon}
              alt="cancel-edit"
              className="opacity-30 hidden group-hover:inline hover:opacity-60 active:opacity-30"
              onClick={(e) => {
                e.stopPropagation();
                const weightInWeightLog = props.weight;
                setWeight(() => weightInWeightLog);
                setIsEditable(false);
              }}
            />
          </div>
        ) : (
          <img
            src={editIcon}
            alt="edit"
            className="absolute top-[10px] right-6 w-5 opacity-30 hidden 
            group-hover:inline hover:opacity-60 active:opacity-30"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditable(true);
            }}
          />
        )}
      </td>
    </tr>
  );
}
