import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import API from "../../utils/API.js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

class SerachForm extends React.Component {
  state = {
    value: "",
    searchxbResults: {},
    searchgsResults: {}
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.searchxb(this.state.value).then(response => {
      console.log(response);
      this.setState({ searchxbResults: response.data });
      console.log(this.state.searchxbResults);
    });
    API.gamestopsearch(this.state.value).then(response => {
      console.log(response);
      this.setState({ searchgsResults: response.data });
      console.log(this.state.searchgsResults);
    });
  };

  saveResults = event => {
    event.preventDefault();
    API.getUser().then(response => {
      API.saveResults(
        response.id,
        this.state.searchxbResults.title,
        this.state.searchxbResults.price,
        this.state.searchgsResults.price
      ).then(response => {
        console.log(response);
      });
    });
  };

  render() {
    return (
      <div>
        <form className="searchForm">
          <TextField
            className="searchField"
            label="Find Game"
            id="outlined-size-normal"
            defaultValue="Normal"
            variant="outlined"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <Button
            className="searchButton"
            size="small"
            variant="contained"
            onClick={this.handleFormSubmit}
          >
            Submit
          </Button>
        </form>
        <img src={this.state.searchxbResults.image} />
        <p className="gameTitle">{this.state.searchxbResults.title}</p>
        <p className={!this.state.searchxbResults.title ? "hide" : null}>
          Xbox Marketplace:&nbsp;{this.state.searchxbResults.price}
        </p>
        <p className={!this.state.searchgsResults.price ? "hide" : null}>
          GameStop:&nbsp;{this.state.searchgsResults.price}
        </p>
        <p className={!this.state.searchgsResults.price2 ? "hide" : null}>
          GameStop:&nbsp;{this.state.searchgsResults.price2}
        </p>
        <Button size="small" variant="contained" onClick={this.saveResults}>
          Save Result
        </Button>
      </div>
    );
  }
}

export default SerachForm;
