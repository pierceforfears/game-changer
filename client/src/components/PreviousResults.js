import React from "react";
import API from "../utils/API.js";
import Button from "@material-ui/core/Button";

class PreviousResults extends React.Component {
  state = {
    searches: []
  };

  getSearches = () => {
    API.getSearches().then(response => {
      console.log(response);
      this.setState({ searches: response.data });
      console.log(this.state.searches);
    });
  };

  render() {
    return (
      <div>
        <Button size="small" variant="contained" onClick={this.getSearches}>
          Saved Results
        </Button>
        {this.state.searches.map(function(item) {
          return (
            <p>
              <ul key={item.id}>
                <li className="gameTitle">{item.title}</li>
                <li>Xbox Marketplace&nbsp;{item.xbprice}</li>
                <li>GameStop&nbsp;{item.gsprice}</li>
                <li>GameStop&nbsp;{item.gsprice2}</li>
              </ul>
            </p>
          );
        })}
      </div>
    );
  }
}

export default PreviousResults;
