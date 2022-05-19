import React, { FC, useContext, useEffect, useState } from "react";
import { Authcontext } from "../Context/Authorization";
import { iBoard, iEdit, iitems, iSubmitForm, iTask } from "../Interfaces";
import { saveData } from "../LocalData";
import "../Style/Task.css";
import TodoForm from "./TodoForm";

const Task: FC<iTask> = ({
  todos,
  id,
  showModal,
  removeTask,
  editTodo,
  setCurrent,
  currentTask,
  dragItem,
}) => {
  const [edit, setEdit] = useState<iEdit>({
    id: null,
    value: "",
  });
  const auth = useContext(Authcontext);

  const submitUpdate = (value: iSubmitForm) => {
    editTodo(value, id);
    saveData();
    setEdit({ id: null, value: "" });
  };

  function dragOverHandler(e: any) {
    e.preventDefault();
    if (e.currentTarget.id === "task") {
      e.currentTarget.style.boxShadow = "0 4px 3px gray";
    }
  }
  function dragLeaveHandler(e: any) {
    e.currentTarget.style.boxShadow = "none";
  }
  function dragStartHandler(e: any, board: iBoard, todo: iitems) {
    setCurrent({ todo, board });
  }
  function dragEndHandler(e: any) {
    e.currentTarget.style.boxShadow = "none";
  }

  function dragHandler(e: any, board: iBoard, todo: iitems) {
    e.preventDefault();
    if (currentTask.board?.id === id) return;
    dragItem(todo, id);
  }

  return (
    <>
      {todos.items.map((todo, index) => (
        <div
          draggable={true}
          onDragOver={(e) => dragOverHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragStart={(e) => dragStartHandler(e, todos, todo)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDrop={(e) => dragHandler(e, todos, todo)}
          className="task rounded-3 mt-2"
          id="task"
          key={index}
        >
          {edit.value === todo.title ? (
            <TodoForm
              idForm="taskForm"
              edit={edit}
              onSubmit={submitUpdate}
              placeholder={{
                textInput: "Введите новое название...",
                textBtn: "Обновить",
              }}
            />
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center">
                {todo.comment && todo.comment.length > 0 && (
                  <div className="d-flex justify-content-center align-items-center mx-2">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chat"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                      </svg>
                    </div>
                    <div className="mx-2 mt-2 ">
                      <h5>{todo.comment?.length}</h5>
                    </div>
                  </div>
                )}
                <div className="m-2">
                  <h6>{auth?.auth}</h6>
                </div>
                <div className="d-flex justify-content-end mx-2">
                  <button
                    className="btn px-1"
                    onClick={() =>
                      setEdit({
                        id: id,
                        value: todo.title,
                        todo: todo,
                      })
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pen-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                    </svg>
                  </button>
                  <button
                    className="btn p-0"
                    onClick={() => removeTask(todo, id)}
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
              <div
                key={index}
                className="bg-light rounded-3 p-1 mb-2  text-start"
                onClick={() => showModal(todo, id)}
                role="button"
              >
                <h4 className="mx-2" key={"h1"}>
                  {todo.title}
                </h4>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default Task;
