import React, { FC, useContext } from "react";
import { Authcontext } from "../Context/Authorization";
import { iModalWindow } from "../Interfaces";
import "../Style/ModalWindow.css";
import Comment from "./Comment";
import DescriptionTask from "./DescriptionTask";

const ModalWindow: FC<iModalWindow> = ({ todo, close }) => {
  const auth = useContext(Authcontext);

  return (
    <div
      className="position-fixed top-0 start-0 modalWindow w-100 h-100 d-flex justify-content-center overflow-auto"
      onClick={close}
    >
      <div
        className="modalWindowContent mt-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="d-flex justify-content-end">
          <button className="btn" onClick={close}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="d-flex m-3 align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
          <h4 className="text-dark mx-2" key={"h2"}>
            {auth?.auth}
          </h4>
        </div>

        <div className=" m-3 ">
          <div className="d-flex align-items-center text-dark ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-window"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
              <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm13 2v2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zM2 14a1 1 0 0 1-1-1V6h14v7a1 1 0 0 1-1 1H2z" />
            </svg>

            <h2 className="mx-2" key={"h2"}>
              {todo.todo?.title}
            </h2>
          </div>

          <div>
            <h6 className="text-dark ">in a collumn: {todo.column?.title}</h6>
          </div>
        </div>

        <div className="m-3">
          <DescriptionTask todo={todo} />

          <div className="my-5">
            <Comment comments={todo.todo?.comment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
