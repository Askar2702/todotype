import React, {
  useState,
  useEffect,
  useRef,
  FC,
  FormEventHandler,
  MouseEventHandler,
} from "react";
import { iProps } from "../Interfaces";

const TodoForm: FC<iProps> = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const [placeholder, setPlaceholder] = useState(
    props.placeholder ? props.placeholder.textInput : "..."
  );
  const [btnText, setBtnText] = useState(
    props.placeholder ? props.placeholder.textBtn : "..."
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    var str = input;
    str = str.replace(/\s/g, "");
    if (!str) return;

    props.onSubmit({
      id: props.edit ? props.edit.id : null,
      text: input,
      todo: props.edit ? props.edit.todo : null,
    });

    setInput("");
  };

  const exit = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: props.edit ? props.edit.value : "",
      todo: props.edit ? props.edit.todo : "nuul",
    });

    setInput("");
  };
  const el = document.querySelector(`#${props.idForm}`);

  return (
    <form className="input-group my-1" onSubmit={handleSubmit}>
      <>
        <div className=" input-group mb-1">
          <input
            type="text"
            placeholder={placeholder}
            value={input}
            name="text"
            id={props.idForm}
            className="form-control"
            onChange={handleChange}
          />
        </div>
        {el === document.activeElement && (
          <div className="p-0 m-0">
            <button
              onClick={handleSubmit}
              className="btn bg-primary text-white  text-end"
            >
              {btnText}
            </button>
            {placeholder !== "Enter your name..." && (
              <button className="btn" onClick={exit}>
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        )}
      </>
    </form>
  );
};

export default TodoForm;
