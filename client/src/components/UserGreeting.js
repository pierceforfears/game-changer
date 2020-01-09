import React from "react";
import API from "../utils/API.js";
import Button from "@material-ui/core/Button";

class UserGreeting extends React.Component {
  state = {};

  handleFormSubmit = event => {
    event.preventDefault();
    API.logout().then(answer => {
      console.log(answer);
      if (answer.data.logout == true) {
        this.props.handleLogin(false, "");
      }
    });
  };

  // componentDidMount(){
  //   this.setState({ username: this.props.username})
  // }

  render() {
    return (
      <>
        <h3>&nbsp;&nbsp;Welcome {this.props.username}!</h3>
        <Button onClick={this.handleFormSubmit}>Logout</Button>
      </>
    );
  }
}

export default UserGreeting;
