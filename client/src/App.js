import React from "react";
import "./App.css";
import Wrapper from "./components/Wrapper";
import Search from "./components/Search";
import NavBar from "./components/navBar";
import PreviousResults from "./components/PreviousResults";

function App() {
  return (
    <div>
      <NavBar />
      <Wrapper>
        <h1>
          <span className="game">GAME</span>
          <span className="changer">changer</span>
          <span className="xbox">for XBOX</span>
        </h1>
        <Search />
      </Wrapper>
      <Wrapper>
        <PreviousResults />
      </Wrapper>
    </div>
  );
}

export default App;
