import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AnimatePresence, motion } from "framer-motion";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MAX_WEIGHT_KG, MIN_WEIGHT_KG, Weight } from "../../globals";
import plusIcon from "../assets/plus-solid.svg";

import { dateIndexInWeightArr, sortWeightLog } from "../utils/utils";
import { userInfoContext } from "../App";

export default function AddWeightButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { control, register, handleSubmit } = useForm<Weight>();
  const { state: userInfo, setState: setUserInfo } =
    useContext(userInfoContext);

  const onWeightSubmit: SubmitHandler<Weight> = (submittedWeight: Weight) => {
    submittedWeight.date = new Date(submittedWeight.date);

    const dateIndexInWeightLog: number = dateIndexInWeightArr(
      submittedWeight.date,
      userInfo.weightLog
    );
    if (dateIndexInWeightLog !== -1) {
      if (confirm("date already exists! ovewrite it?") === false) {
        return;
      }

      userInfo.weightLog[dateIndexInWeightLog].weightKg =
        submittedWeight.weightKg;

      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        weightLog: [...prevUserInfo.weightLog],
      }));
      return;
    }

    setUserInfo((prevUserInfo) => ({
      ...userInfo,
      weightLog: sortWeightLog([...prevUserInfo.weightLog, submittedWeight]),
    }));
  };
  return (
    <motion.div
      className="fixed bottom-4 custom-shadow right-8 h-12 rounded-full
                          p-2 flex justify-center items-center hover:cursor-pointer"
    >
      <AnimatePresence>
        {isOpen ? (
          <form onSubmit={handleSubmit(onWeightSubmit)} className="flex">
            <input
              {...register("weightKg", {
                required: true,
                max: MAX_WEIGHT_KG,
                min: MIN_WEIGHT_KG,
              })}
              className="border-1 border-black"
              type="number"
              step={0.2}
              min={MIN_WEIGHT_KG}
              placeholder="enter weight"
            />

            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  className="border-1 border-black"
                  placeholderText="enter a date"
                  selected={field.value}
                  onChange={(date: Date) => field.onChange(date)}
                  maxDate={new Date()}
                />
              )}
              rules={{
                required: "specify a date",
              }}
            />
            <input type="submit" />
          </form>
        ) : undefined}
      </AnimatePresence>
      <img
        src={plusIcon}
        alt="add-weight-icon"
        className="w-8"
        onClick={() => setIsOpen(!isOpen)}
      />
    </motion.div>
  );
}
