import { useState } from "react";
import { useAnimation, motion, Variants } from "framer-motion";

import menuIcon from "../assets/menu-icon.svg";

export default function Menu() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const control = useAnimation();

  const menuVariants: Variants = {
    hidden: {
      width: 50,
    },
    visible: {
      width: 440,
    },
  };

  const listVariants: Variants = {
    hidden: {
      x: 12,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };
  return (
    <motion.div
      className={`absolute right-2 bg-white custom-shadow flex flex-row-reverse rounded-full`}
      variants={menuVariants}
      animate={control}
    >
      <img
        src={menuIcon}
        alt="menu-icon"
        onClick={(e) => {
          setIsMenuActive(!isMenuActive);
          if (!isMenuActive) {
            control.start({
              width: 400,
            });
          } else {
            control.start({
              width: e.currentTarget.offsetWidth,
            });
          }
        }}
        className={`relative left-0 p-4 hover:cursor-pointer`}
      />
      {isMenuActive ? (
        <ul className={`w-96 flex justify-around `}>
          <motion.li
            variants={listVariants}
            className="w-full py-3 text-center rounded-full hover:cursor-pointer hover:bg-gray-100"
          >
            Profile
          </motion.li>
          <motion.li
            variants={listVariants}
            className="w-full py-3 text-center rounded-full hover:cursor-pointer hover:bg-gray-100"
          >
            Settings
          </motion.li>
          <motion.li
            variants={listVariants}
            className="w-full py-3 text-center rounded-full hover:cursor-pointer hover:bg-gray-100"
          >
            Logout
          </motion.li>
        </ul>
      ) : undefined}
    </motion.div>
  );
}
