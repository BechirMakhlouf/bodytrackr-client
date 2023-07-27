import { useContext, useState } from "react";
import { motion, useAnimation } from "framer-motion";

import { loginContext, userInfoContext } from "../App";
import { handleLogout } from "../controllers/sessionManagementController";
import LoginModal from "./loginModalComponent";
import menuIcon from "../assets/menu-icon.svg";
import { UserInfo } from "../../globals";

export default function Menu() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { state: loginState, setState: setLoginState } = useContext(
    loginContext,
  );
  const { state: userInfo, setState: setUserInfo } = useContext(userInfoContext)

  const control = useAnimation();

  return (
    <motion.div
      className={`absolute right-2 bg-white custom-shadow flex flex-row-reverse rounded-full`}
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
      {(() => {
        if (!isMenuActive) {
          return undefined;
        }
        return (
          <ul className={`w-96 flex justify-around `}>
            <li className="w-full py-3 text-center rounded-full hover:cursor-pointer hover:bg-gray-100">
              Profile
            </li>
            <li className="w-full py-3 box-content text-center rounded-full hover:cursor-pointer hover:bg-gray-100">
              Settings
            </li>
            <li className="w-full py-3 text-center rounded-full hover:cursor-pointer hover:bg-gray-100">
              {loginState.isLoggedIn
                ? (
                  <span
                    onClick={async () => {
                      if (loginState.isLoggedIn && loginState.accessToken) {
                        const isLogoutSuccess: boolean = await handleLogout(
                          userInfo,
                          loginState.accessToken,
                        );
                        if (isLogoutSuccess) {
                          setLoginState({
                            isLoggedIn: false,
                            hasRefreshToken: false,
                            accessToken: null,
                          });
                        }
                      }
                    }}
                  >
                    Logout
                  </span>
                )
                : <LoginModal>LogIn</LoginModal>}
            </li>
          </ul>
        );
      })()}
    </motion.div>
  );
}
