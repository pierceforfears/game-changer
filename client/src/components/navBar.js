import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Login from "./login";
import UserGreeting from "./UserGreeting";

class NavBar extends React.Component {
  state = {
    isLoggedIn: false,
    username: ""
  };
  renderGreeting = () => {
    if (!this.state.isLoggedIn) {
      return <Login handleLogin={this.handleLogin} />;
    } else {
      return (
        <UserGreeting
          username={this.state.username}
          handleLogin={this.handleLogin}
        />
      );
    }
  };
  handleLogin = (loginState, username) => {
    this.setState({
      isLoggedIn: loginState,
      username: username
    });
  };
  render(props) {
    return (
      <div>
        <AppBar position="static" style={{ background: "#0e7a0d" }}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              <h3>Looking for the best deal on games? Let GameChanger help.</h3>
              {this.renderGreeting()}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NavBar;
