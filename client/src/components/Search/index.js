import React, { Component } from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import axios from "axios";
import API from "../../utils/API.js";

class SerachForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state.value);
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("/api/gamestop", {
      method: "GET"
    });

    fetch("/api/xbox", {
      method: "GET"
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SerachForm;

// class Search extends React.Component {
//   state = {
//     query: "",
//     data: [],
//     filteredData: []
//   };

//   handleInputChange = event => {
//     // Pull the name and value properties off of the event.target (the element which triggered the event)
//     const { name, value } = event.target;

//     // Set the state for the appropriate input field
//     this.setState({
//       [name]: value
//     });
//   };

//   handleFormSubmit = event => {
//     event.preventDefault();
//     // alert(`Query Result: ${this.state.query}`);
//     // axios
//     //   // .post("http://localhost:3001/api/signup", {
//     //   //   username: this.state.query,
//     //   //   password: this.state.password
//     //   // })
//     //   .get("http://localhost:3001/api/test")
//     API.search(this.state.query).then(answer => {
//       console.log(answer);
//       this.setState({ query: "" });
//     });
//   };

//   //handle submit<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//   //api.game<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//   //api.xbox<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//   render(props) {
//     return (
//       <div className="searchForm">
//         <form>
//           <input
//             className="field"
//             placeholder="Search for..."
//             value={this.state.query}
//             name="query"
//             onChange={this.handleInputChange}
//           />
//           <button onClick={this.handleFormSubmit}>Submit</button>
//         </form>
//         <div>
//           {this.state.filteredData.map(i => (
//             <p>{i.name}</p>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// export default Search;
