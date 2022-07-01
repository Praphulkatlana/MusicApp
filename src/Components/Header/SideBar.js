import React from "react";
import "./Header.css";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
const SideBar = () => {
  return (
    <div id="sidebar">
      <ul className="tabs">
        <li className="mobileview">
          <AiOutlineHome />
          <a className="activetab">Home</a>
        </li>
        <li className="mobileview">
          <AiOutlineSearch />
          <a className="mobileview">Search</a>
        </li>
        <li className="mobileview">
          <FcLike />
          <a className="mobileview">Favourites</a>
        </li>
        <hr className="HrLine" />
      </ul>
    </div>
  );
};

export default SideBar;

//

// {

// <svg
// className="svg"
// fill="#ffffff"
// xmlns="http://www.w3.org/2000/svg"
// viewBox="0 -5 24 24"
// width="24px"
// height="30px"
// >
// <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z" />
// </svg>
// <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="#ffffff"
//             x="0px"
//             y="90px"
//             width="24px"
//             height="26px"
//             viewBox="0 0 44 44"
//           >
//             <path d="M 21 3 C 11.6 3 4 10.6 4 20 C 4 29.4 11.6 37 21 37 C 24.354553 37 27.47104 36.01984 30.103516 34.347656 L 42.378906 46.621094 L 46.621094 42.378906 L 34.523438 30.279297 C 36.695733 27.423994 38 23.870646 38 20 C 38 10.6 30.4 3 21 3 z M 21 7 C 28.2 7 34 12.8 34 20 C 34 27.2 28.2 33 21 33 C 13.8 33 8 27.2 8 20 C 8 12.8 13.8 7 21 7 z"></path>
//           </svg>}
