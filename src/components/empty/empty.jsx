import React from "react";
import image from "../../images/empty-man.png";
import style from "./empty.module.css";
import dark from "../../images/dark.svg";
import light from "../../images/light.svg";

function Empty({ theme }) {
  return (
    <>
      <img className={style.image} src={image} alt="No notes" />
      <p
        className={`${
          theme === light
            ? `${style.text} ${style.light}`
            : `${style.text} ${style.dark}`
        }`}
      >
        Time to add some notes
      </p>
    </>
  );
}

export default Empty;
