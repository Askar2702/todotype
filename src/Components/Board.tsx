import React, { FC, useContext, useState } from "react";
import Task from "./Task";
import TodoForm from "./TodoForm";
import "../Style/Board.css";
import ModalWindow from "./ModalWindow";
import AuthModal from "./AuthModal";
import { Authcontext, iAuth } from "../Context/Authorization";
import { loadData, saveData, setData } from "../LocalData";
import {
  iBoard,
  iCurrentTask,
  iEdit,
  iitems,
  iSubmitForm,
} from "../Interfaces";

const Board: FC = () => {
  const [boards, setBoards] = useState(loadData());
  setData(boards);

  const [edit, setEdit] = useState<iEdit>({
    id: null,
    value: "",
  });

  const [currentTask, setCurrentTask] = useState<iCurrentTask>({
    todo: null,
    column: null,
  });

  const [formSelect, setFormSelect] = useState("");

  const authcontext = useContext(Authcontext);

  const openFormForAddTask = (e: iBoard) => {
    setEdit({ id: e.id, value: e.title });
    const arr = boards.filter((i: iBoard) => i.id == e.id);
  };

  const createTask = (value: iSubmitForm) => {
    boards.map((item: iBoard) => {
      item.items = [...item.items];
      item.id === edit.id &&
        (item.items = [
          {
            title: value.text,
            desc: "",
            comment: [],
          },
          ...item.items,
        ]);
    });

    saveData();
    setEdit({ id: null, value: "" });
  };

  const showModal = (e: iitems, id: number) => {
    const col = boards.find((t: iBoard) => t.id === id);
    setCurrentTask({
      todo: e,
      column: col,
    });
  };

  const closeModal = () => {
    setCurrentTask({ todo: null, column: null });
  };

  const removeTask = (todo: iitems, id: number) => {
    const b = [...boards];
    b.filter((item) => {
      if (item.id == id) {
        item.items = item.items.filter((i: iitems) => i !== todo);
      }
    });

    setBoards(b);
    saveData();
  };

  const editTodo = (newValue: iSubmitForm, id: number) => {
    if (newValue.text === "") {
      return;
    }
    boards.map((item: iBoard) => {
      item.items = [...item.items];
      item.id === id &&
        item.items.map((i) => {
          i.title === newValue.todo?.title
            ? (i.title = newValue.text)
            : (i.title = i.title);
        });
    });
  };

  const renameTitle = (newValue: iSubmitForm) => {
    var b = [...boards];
    b.map((t) => {
      t.id === newValue.id ? (t.title = newValue.text) : (t.title = t.title);
    });
    setBoards(b);
    setFormSelect("");
    saveData();
  };

  const dragItem = (todo: iitems, id: number) => {
    const g = [...boards];
    g.map((i) => {
      i.id === id && i.items.push(currentTask.todo);
    });
    setBoards(g);
    if (currentTask.todo && currentTask.board) {
      removeTask(currentTask.todo, currentTask.board.id);
    }
  };
  function dragOverHandler(e: any) {
    e.preventDefault();
  }
  function dragHandler(e: any, board: iBoard) {
    e.preventDefault();
    if (currentTask.todo && currentTask.board) {
      if (currentTask.board.id === board.id || board.items.length > 0) return;
      board.items.push(currentTask.todo);
      removeTask(currentTask.todo, currentTask.board.id);
    }
  }

  if (authcontext?.auth === "") {
    return <AuthModal />;
  }

  return (
    <div className="d-flex flex-row justify-content-around  mt-lg-5">
      {boards.map((b: iBoard) => (
        <div
          id="board"
          key={b.title}
          className="container board   
            m-2 text-center rounded-3"
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dragHandler(e, b)}
        >
          {formSelect === "titleRename" + b.id ? (
            <TodoForm
              edit={{ id: b.id, value: b.title, todo: b }}
              idForm="columnForm"
              placeholder={{
                textInput: "Введите новое название...",
                textBtn: "Сохранить",
              }}
              onSubmit={renameTitle}
            />
          ) : (
            <div
              key={b.title}
              className="board__title p-3 mt-2 rounded-3"
              onClick={() => {
                setFormSelect("titleRename" + b.id);
              }}
            >
              {b.title}
            </div>
          )}

          <Task
            todos={b}
            id={b.id}
            showModal={showModal}
            removeTask={removeTask}
            editTodo={editTodo}
            setCurrent={setCurrentTask}
            currentTask={currentTask}
            dragItem={dragItem}
          />
          {edit.id == b.id ? (
            <TodoForm
              onSubmit={createTask}
              idForm="createTasks"
              placeholder={{
                textInput: "Создайте задачу...",
                textBtn: "Сохранить",
              }}
            />
          ) : (
            <div className="my-2 p-0">
              <button
                type="button"
                className="btn board__btn w-100"
                onClick={() => openFormForAddTask(b)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                  style={{ fill: "#000" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                  />
                </svg>
                New Task
              </button>
            </div>
          )}
        </div>
      ))}
      {currentTask.column && (
        <ModalWindow todo={currentTask} close={closeModal} />
      )}
    </div>
  );
};

export default Board;
