import React, { useRef, useState } from "react";
import style from "./modalwindow.module.css";
import plus from "../../images/plus.svg";
import dark from "../../images/dark.svg";
import light from "../../images/light.svg";

function Modal({ sendNote, theme }) {
  const [show, setShow] = useState(false);
  const inputRef = useRef();

  function sendData() {
    sendNote(inputRef.current.value);
    setTimeout(() => {
      inputRef.current.value = "";
    }, 1);
  }

  return (
    <>
      <button className={style.add} onClick={() => setShow(true)}>
        <img src={plus} alt="Plus element" />
      </button>

      {show && (
        <>
          <div
            className={`${
              theme === dark
                ? `${style.newNote} ${style.lightBackground}`
                : `${style.newNote} ${style.darkBackground}`
            }`}
          >
            <h2
              className={`${
                theme === light
                  ? `${style.noteHeading} ${style.light}`
                  : `${style.noteHeading} ${style.dark}`
              }`}
            >
              New Note
            </h2>
            <input
              type="text"
              className={`${
                theme === dark
                  ? `${style.inputField}`
                  : `${style.inputFieldDark}`
              }`}
              placeholder="Input your note..."
              ref={inputRef}
            />
            <div className={style.modalButtons}>
              <button className={style.cancel} onClick={() => setShow(false)}>
                Cancel
              </button>
              <button className={style.apply} onClick={sendData}>
                Apply
              </button>
            </div>
          </div>
          <div className={style.darker}></div>
        </>
      )}
    </>
  );
}

export default Modal;
