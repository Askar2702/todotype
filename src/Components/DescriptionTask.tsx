import React, { FC, useState } from "react";
import { IDescriptionTask, iSubmitForm } from "../Interfaces";
import { saveData } from "../LocalData";
import TodoForm from "./TodoForm";

const DescriptionTask: FC<IDescriptionTask> = ({ todo }) => {
  const [desc, setDesc] = useState(todo.todo?.desc ? todo.todo?.desc : "");
  const changeDesc = (e: iSubmitForm) => {
    if (e.text !== null && todo.todo) {
      todo.todo.desc = e.text;
      setDesc(todo.todo.desc);
    }
    saveData();
  };

  return (
    <div>
      <div className="d-flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-card-text"
          viewBox="0 0 16 16"
        >
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
          <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
        </svg>
        <div className="align-self-end ms-2">
          <h3 className="h5 text-dark">Description</h3>
        </div>
        <div>
          <button
            className="btn text-decoration-underline"
            onClick={() => {
              setDesc("");
            }}
          >
            Change
          </button>
          <button
            className="btn p-0"
            onClick={() => {
              changeDesc({ id: null, text: "", todo: todo.todo });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
          </button>
        </div>
      </div>
      {desc ? (
        <h3 className="h5 text-dark ">{todo.todo?.desc}</h3>
      ) : (
        <div className=" mt-3">
          <TodoForm
            edit={{ id: todo.column?.id, value: todo.todo?.desc }}
            idForm="descForm"
            placeholder={{
              textInput: "Add a more detailed description...",
              textBtn: "Save",
            }}
            onSubmit={changeDesc}
          />
        </div>
      )}
    </div>
  );
};

export default DescriptionTask;
