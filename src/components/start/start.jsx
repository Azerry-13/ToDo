import React, { useEffect, useRef, useState } from "react";
import dark from "../../images/dark.svg";
import light from "../../images/light.svg";
import style from "./start.module.css";
import Notes from "../notes/notes";

function Start() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState("All");
  const [theme, setTheme] = useState(dark);
  const [search, setSearch] = useState("");
  const dropRef = useRef(null);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event) => {
    if (dropRef.current && !dropRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const changeTheme = () => {
    if (theme === dark) {
      setTheme(light);
    } else {
      setTheme(dark);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div
        className={`${
          theme === light
            ? `${style.backgroundThemeDark}`
            : `${style.backgroundTheme}`
        }`}
      ></div>
      <h1
        className={`${
          theme === light
            ? `${style.heading} ${style.light}`
            : `${style.heading} ${style.dark}`
        }`}
      >
        ToDo or NotToDo
      </h1>
      <div className={style.form}>
        <div className={style.field}>
          <input
            type="text"
            className={style.inputField}
            placeholder="Search note..."
            onChange={(e) => handleChange(e)}
          />
          <div className={style.search_icon}></div>
        </div>
        <div
          ref={dropRef}
          onClick={handleClick}
          className={open ? `${style.clicked}` : `${style.select}`}
        >
          <div className={style.chosen}>{show}</div>
          <div
            className={
              open
                ? `${style.options} ${style.show}`
                : `${style.options} ${style.hide}`
            }
          >
            <div className={style.option} onClick={() => setShow("All")}>
              All
            </div>
            <div className={style.option} onClick={() => setShow("Complete")}>
              Complete
            </div>
            <div className={style.option} onClick={() => setShow("Incomplete")}>
              Incomplete
            </div>
          </div>
        </div>
        <button className={style.theme} onClick={changeTheme}>
          <img src={theme} alt="" />
        </button>
      </div>
      <Notes theme={theme} show={show} search={search} />
    </>
  );
}

export default Start;
