import { useEffect } from "react";
import { iBoard, iitems } from "./Interfaces";
var dataTodo: iBoard | null = null;

export function loadData() {
  if (localStorage.hasOwnProperty("Todo")) {
    const data = localStorage.getItem("Todo");
    return data && JSON.parse(data);
  } else
    return [
      {
        id: 1,
        title: "TODO",
        items: [],
      },
      {
        id: 2,
        title: "In Progress",
        items: [],
      },
      {
        id: 3,
        title: "Testing",
        items: [],
      },
      {
        id: 4,
        title: "Done",
        items: [],
      },
    ];
}

export function setData(data: iBoard) {
  dataTodo = data;
}

export function saveData() {
  localStorage.setItem("Todo", JSON.stringify(dataTodo));
}
