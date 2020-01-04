import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Games from "./Games";
// not sure if we will be using contentful
import * as contentful from "contentful";
import "./style.css";

// don't think we actually need these:
const SPACE_ID = "";
const ACCESS_TOKEN = "";

const client = contentful.createClient({
  speace: SPACE_ID,
  accessToken: ACCESS_TOKEN
});

class GamesList extends Component {
  state = {
    games: [],
    searchString: ""
  };

  constructor() {
    super();
    this.getGames();
  }

  getGames = () => {
    client
      .getEntries({
        content_type: "games",
        query: this.state.searchString
      })
      .then(response => {
        this.setState({ games: response.items });
      })
      .catch(error => {
        console.log("Error occurred while fetching data");
        console.log(error);
      });
  };

  onSearchInputChange = event => {
    if (event.target.value) {
      this.setState({ searchString: event.target.value });
    } else {
      this.setState({ searchString: "" });
    }
    this.getGames();
  };

  render() {
    return (
      <div>
        {this.state.games ? (
          <div>
            <Textfield
              style={{ padding: 24 }}
              id="searchInput"
              placeholder="Search for Games"
              margin="normal"
              onChange={this.onSearchInputChange}
            />
            <Grid container spacing={24} style={{ padding: 24 }}>
              {this.state.games.map(currentGame => (
                <Grid item xs={12} sm={6} lg={4} xl={3}>
                  <Game game={currentGame} />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          "No games found"
        )}
      </div>
    );
  }
}

export default GamesList;
