import { useState, useContext } from "react";
import DatePicker from "react-datepicker";

import editIcon from "../assets/edit-text.svg";
import { Weight } from "../../globals";
import { formatWeight, formatDate } from "../utils/utils";
import { preferencesContext } from "../App";

export default function WeightTableRow(props: {
  weight: Weight;
  weightDiff: number;
}) {
  const [isEditable, setIsEditable] = useState(false);
  const {
    state: { weightUnit },
  } = useContext(preferencesContext);
  const weight = props.weight;
  const weightDiff = props.weightDiff;

  const formattedDate: string = formatDate(weight.date);
  const formattedWeight: string = formatWeight(weight.weightKg, weightUnit);
  const formattedWeightDiff: string = weightDiff.toFixed(1);

  return (
    <tr
      key={formattedDate}
      className="group relative py-2 custom-shadow-hover flex  
                            justify-around text-center border-0 rounded-3xl"
    >
      <td className="w-full text-center text-base text-grey-grey">
        {isEditable ? (
          <DatePicker
            className="border-1 border-black"
            placeholderText="enter a date"
            onChange={(date: Date) => date}
            selected={weight.date}
            maxDate={new Date()}
          />
        ) : (
          formattedDate
        )}
      </td>
      <td className="w-full text-center text-base ">{formattedWeight}</td>
      <td
        className={`text-center text-base w-full ${
          weightDiff > 0 ? "text-sidibou-blue" : ""
        } italic`}
      >
        {formattedWeightDiff}
      </td>
      <td>
        <img
          src={editIcon}
          alt="edit"
          className="absolute top-[10px] right-6 w-5 opacity-30 hidden 
                    group-hover:inline hover:opacity-60 active:opacity-30"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditable(() => !isEditable);
          }}
        />
      </td>
    </tr>
  );
}
