import React, { FC, FormEventHandler, useContext, useState } from "react";
import { Authcontext } from "../Context/Authorization";
import { iComment, iEdit, iSubmitForm } from "../Interfaces";
import { saveData } from "../LocalData";
import TodoForm from "./TodoForm";

const Comment: FC<iComment> = ({ comments }) => {
  const auth = useContext(Authcontext);

  const [coms, setComs] = useState<string[]>(comments ? comments : []);

  const [edit, setEdit] = useState<iEdit>({
    id: null,
    value: "",
  });

  const addComment = (e: iSubmitForm) => {
    if (e.text) {
      setComs([...coms, e.text]);
      comments?.push(e.text);
      saveData();
    }
  };

  const renameComment = (e: iSubmitForm) => {
    const com = coms;

    if (com && e.id !== null && e.text) {
      com[e.id] = e.text;
    }
    setComs(com);
    setEdit({ id: null, value: "" });
    saveData();
  };

  const deleteCom = (id: number) => {
    var com = coms.filter((e, index) => index !== id);
    comments?.splice(id, 1);

    setComs(com);
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
          className="bi bi-chat-right-text"
          viewBox="0 0 16 16"
        >
          <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
          <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
        </svg>
        <h3 className="h5 text-dark mx-2">Comments</h3>
      </div>
      <div className=" mt-3">
        <TodoForm
          idForm="commentsForm"
          placeholder={{
            textInput: "Write a comment...",
            textBtn: "Save",
          }}
          onSubmit={addComment}
        />
      </div>
      {coms.map((com: string, index: number) => (
        <div key={index}>
          <div className="text-dark mt-3">
            <h5 className="text-lowercase">{auth?.auth}</h5>
            {edit.id === index ? (
              <TodoForm
                edit={edit}
                idForm="commentsFormCom"
                placeholder={{
                  textInput: "Update comment...",
                  textBtn: "Update",
                }}
                onSubmit={renameComment}
              />
            ) : (
              <>
                <div className="bg-light py-2 rounded-3">
                  <div className="mx-3">{com}</div>
                </div>

                <button
                  className="btn text-decoration-underline"
                  onClick={() => setEdit({ id: index, value: com })}
                >
                  Change
                </button>
                <button
                  className="btn text-decoration-underline"
                  onClick={() => deleteCom(index)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
