import React, { useState, useContext } from "react";
import "./Header.css";
import { FcMusic } from "react-icons/fc";
import { GiDoorHandle } from "react-icons/gi";
import { GiExitDoor } from "react-icons/gi";
import { IconContext } from "react-icons";
import { signInWithPopup, signOut } from "firebase/auth";
import { Provider, auth } from "../../Firebase";
import { AppContext } from "../../Store/Context";
import { loginout } from "../../Store/Action";

const Header = () => {
  const { StoreDispatch } = useContext(AppContext);
  const [isLogin, setisLogin] = useState(false);
  const [userName, setuserName] = useState("");
  const handleloginOut = () => {
    if (isLogin) {
      signOut(auth)
        .then(() => {
          setisLogin(false);
          StoreDispatch({
            type: loginout,
            payload: { islogin: false },
          });
        })
        .catch((e) => {
          alert("Something went wrong while logout please try again");
        });
    } else {
      signInWithPopup(auth, Provider)
        .then((response) => {
          let name = response.user.auth;
          name = name.currentUser;

          if (name.displayName) {
            name = name.displayName.split(" ");
            name = name[0].toString();
            name = name.slice(0, 8);
            name = name.length > 8 ? name + "..." : name;
          } else {
            name = "User";
          }

          setuserName(name);
          StoreDispatch({
            type: loginout,
            payload: { islogin: true, user: name },
          });
          setisLogin(true);
        })
        .catch((e) => {
          console.log(e);
          alert("Something went wrong while login please try again");
        });
    }
  };

  return (
    <div>
      <div id="Header_main">
        <div className="logo">
          <IconContext.Provider value={{ size: "3em" }}>
            <FcMusic />
          </IconContext.Provider>
        </div>
        <IconContext.Provider value={{ size: "2em" }}>
          <div className="userInfo">
            {isLogin ? (
              <GiExitDoor onClick={handleloginOut} />
            ) : (
              <GiDoorHandle onClick={handleloginOut} />
            )}
            {isLogin && <h3>{userName}</h3>}
          </div>
        </IconContext.Provider>
      </div>
      <hr className="hrLine" />
    </div>
  );
};

export default Header;
