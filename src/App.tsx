import { useState } from "react";
import "./App.css";
import Board from "./Components/Board";
import { Authcontext, iAuth } from "./Context/Authorization";

function App() {
  const [auth, setAuth] = useState<string>("");
  function SetAuth<iAuth>(e: string) {
    e && setAuth(e);
  }
  return (
    <Authcontext.Provider value={{ auth, SetAuth }}>
      <Board />
    </Authcontext.Provider>
  );
}

export default App;
