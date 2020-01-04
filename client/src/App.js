import React from "react";
import "./App.css";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Search from "./components/Search";
import Results from "./components/Results";
import NavBar from "./components/navBar";
// import GamesList from "./components/GamesList";

function App() {
  return (
    <div>
      <NavBar />
      <Wrapper>
        <Title>GameChanger</Title>
        <Search />
        {/* <Results /> */}
      </Wrapper>
    </div>
  );
}

export default App;
