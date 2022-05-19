import React, { FC, useContext } from "react";
import { Authcontext, iAuth } from "../Context/Authorization";
import { iSubmitForm } from "../Interfaces";
import "../Style/AuthModal.css";
import TodoForm from "./TodoForm";

const AuthModal: FC = () => {
  const auth = useContext(Authcontext);

  const authorization = (e: iSubmitForm) => {
    e.text && auth?.SetAuth(e.text);
  };
  return (
    <div className="position-fixed top-0 start-0 modalWindow w-100 h-100 d-flex justify-content-center align-items-center">
      <div className="modalWindowContent mt-5 p-5 rounded-3">
        <div className="text-dark text-center my-3">
          <h3>Введите своё имя</h3>
        </div>
        <TodoForm
          onSubmit={authorization}
          idForm="aurhForm"
          placeholder={{ textInput: "Введите имя...", textBtn: "Сохранить" }}
        />
      </div>
    </div>
  );
};

export default AuthModal;
