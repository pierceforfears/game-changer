import React from "react";
import "./App.css";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Search from "./components/Search";
import Results from "./components/Results";
import NavBar from "./components/navBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
// import GamesList from "./components/GamesList";

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
    </div>
  );
}

export default App;
