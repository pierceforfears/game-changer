import React from "react";
import API from "../utils/API.js";
import Button from "@material-ui/core/Button";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    data: [],
    filteredData: []
  };

  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;

    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  };

  // componentDidMount = () => {};

  componentWillUnmount() {
    this.setState({ username: "", password: "" });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    API.signUp(this.state.username, this.state.password).then(answer => {
      console.log(answer);
      if (answer.status === 200) {
        this.props.handleLogin(true, answer.data.username);
      }
    });
  };

  render(props) {
    return (
      <div>
        <form className="loginForm">
          <input
            className="field"
            placeholder="Username"
            value={this.state.username}
            name="username"
            onChange={this.handleInputChange}
          />
          <input
            className="field"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <button
            size="small"
            variant="contained"
            onClick={this.handleFormSubmit}
          >
            Login
          </button>
        </form>
        <div>
          {this.state.filteredData.map(i => (
            <p>{i.name}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default Login;
