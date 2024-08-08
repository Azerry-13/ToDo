import React, { useEffect, useState } from "react";
import Modal from "../modal/modal";
import Empty from "../empty/empty";
import style from "./notes.module.css";
import check from "../../images/check.svg";
import dark from "../../images/dark.svg";
import light from "../../images/light.svg";

function Notes({ theme, show, search }) {
  const [notes, setNotes] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    setIsEmpty(notes.length === 0);
  }, [notes]);

  function handleClick(index) {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes];
      updatedNotes[index] = {
        ...updatedNotes[index],
        completed: !updatedNotes[index].completed,
      };
      return updatedNotes;
    });
  }

  function deleteClick(event, index) {
    event.stopPropagation();
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
  }

  function getNote(data) {
    setNotes((prev) => [...prev, { text: data, completed: false }]);
  }

  function getFilteredNotes() {
    const filteredByShow = notes.filter((note) => {
      if (show === "All") return true;
      if (show === "Incomplete") return !note.completed;
      if (show === "Complete") return note.completed;
      return true;
    });

    return filteredByShow.filter(
      (note) =>
        note.text && note.text.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <>
      <Modal sendNote={getNote} theme={theme} />
      {isEmpty ? (
        <Empty theme={theme} />
      ) : (
        <div className={style.notes_container}>
          {getFilteredNotes().map((note, index) => (
            <div
              key={index}
              className={style.note}
              onClick={() => handleClick(index)}
            >
              <span
                className={`${style.checkbox} ${
                  note.completed ? style.clicked : ""
                }`}
              >
                <img src={check} alt="" />
              </span>
              <div
                className={`${
                  theme === light
                    ? `${style.noteText} ${style.light} ${
                        note.completed ? style.textClicked : ""
                      }`
                    : `${style.noteText} ${style.dark} ${
                        note.completed ? style.textClicked : ""
                      }`
                }`}
              >
                {note.text}
              </div>
              <div className={style.controls}>
                <span
                  className={style.delete}
                  onClick={(event) => deleteClick(event, index)}
                ></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Notes;
