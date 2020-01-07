import React, { Component } from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import API from "../../utils/API.js";

const useStyles = makeStyles({
  // card: {
  //   maxWidth: 345
  // },
  // media: {
  //   height: 140
  // }
});

class SerachForm extends React.Component {
  state = {
    value: "",
    searchxbResults: {},
    searchgsResults: {}
  };

  // constructor(props) {
  //   super(props);
  //   this.state = { value: "" };

  // this.handleChange = this.handleChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);
  // }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  // handleSubmit(event) {
  //   console.log(this.state.value);
  //   event.preventDefault();
  //   const data = new FormData(event.target);

  // fetch("/api/gamestop", {
  //   method: "GET"
  // });

  // fetch("/api/xbox", {
  //   method: "GET"
  // });
  // }

  handleFormSubmit = event => {
    event.preventDefault();
    API.searchxb(this.state.value).then(response => {
      console.log(response);
      this.setState({ searchxbResults: response.data });
      // thie state search reslts
      console.log(this.state.searchxbResults);
    });
    API.gamestopsearch(this.state.value).then(response => {
      console.log(response);
      this.setState({ searchgsResults: response.data });
      // thie state search reslts
      console.log(this.state.searchgsResults);
    });
    //new state var searchgame stop
  };

  render() {
    return (
      <div>
        <form className="searchField">
          <label>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
        <img src={this.state.searchxbResults.image} />
        <p className="gameTitle">{this.state.searchxbResults.title}</p>
        <p className="hide">
          Xbox Marketplace:&nbsp;{this.state.searchxbResults.price}
        </p>
        <p className="hide">
          GameStop:&nbsp;{this.state.searchgsResults.price}
        </p>
        {/* <Card>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.state.searchxbResults.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.state.searchxbResults.price}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.state.searchgsResults.price}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card> */}
      </div>
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
