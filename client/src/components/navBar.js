import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Login from "./login";
const NavBar = () => {
  return (
    <div>
      <AppBar position="static" style={{ background: "#0e7a0d" }}>
        <Toolbar>
          <Typography variant="title" color="inherit">
            <h3>Looking for the best deal on games? Let GameChanger help.</h3>
            <Login />
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
