export interface iComment {
  comments?: string[];
}

export interface iitems {
  title?: string | null;
  desc?: string;
  comment?: string[];
}

export interface iBoard {
  id: number;
  title: string;
  items: iitems[];
}

export interface IDescriptionTask {
  todo: iCurrentTask;
}

export interface iEdit {
  id?: number | null;
  value?: string | null;
  todo?: iitems;
}
export interface iSubmitForm {
  id: number | null;
  text: string | null;
  todo: iBoard | iitems | null;
}

export interface iCurrentTask {
  todo: iitems | null;
  column: iBoard | null;
}

interface iPlaceholder {
  textInput: string;
  textBtn: string;
}
export interface iProps {
  onSubmit: (e: iSubmitForm) => void;
  idForm: string;
  placeholder: iPlaceholder;
  edit?: any;
}

export interface iModalWindow {
  todo: iCurrentTask;
  close: () => void;
}

export interface iTask {
  todos: iitems[];
  id: number;
  showModal: (e: iitems, id: number) => void;
  removeTask: (todo: iitems, id: number) => void;
  editTodo: (newValue: iSubmitForm, id: number) => void;
}
