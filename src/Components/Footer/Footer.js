import React, { useContext, useState } from "react";
import { AppContext } from "../../Store/Context";
import "./Footer.css";
import Music from "./Music";
import { GiMusicSpell } from "react-icons/gi";
import { IconContext } from "react-icons";

const Footer = () => {
  const { Store } = useContext(AppContext);
  const [rotate, setrotate] = useState(false);
  const rotationtoggle = (flag) => {
    setrotate(flag);
  };
  return (
    <div id="footerDiv">
      <section className="Songinfo">
        <IconContext.Provider value={{ size: "4em" }}>
          <GiMusicSpell className={rotate && "musicIcon"} />
        </IconContext.Provider>
        <p>
          {Store.currentSongName.slice(0, 35)}{" "}
          <span> {Store.currentSongName.length > 30 && "..."}</span>
        </p>
      </section>
      <div className="controller">
        <Music rotationtoggle={(e) => rotationtoggle(e)} />
      </div>
    </div>
  );
};

export default Footer;
