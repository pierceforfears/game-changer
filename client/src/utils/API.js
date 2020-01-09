import axios from "axios";

export default {
  searchxb: function(searchTerm) {
    return axios.post("/api/xbox/search", { searchTerm });
  },
  getUser: function() {
    return axios.get("/api/user");
  },
  gamestopsearch: function(searchTerm) {
    return axios.post("/api/gamestop/search", {
      searchTerm
    });
  },
  signUp: function(username, password) {
    return axios.post("/api/signup", {
      username: username,
      password: password
    });
  },
  getSearches: function() {
    return axios.get("/api/searches");
  },
  saveResults: function(UserId, title, xbprice, gsprice, gsprice2) {
    return axios.post("/api/saveResults", {
      UserId,
      title,
      xbprice,
      gsprice,
      gsprice2
    });
  },
  logout: function() {
    return axios.get("/logout");
  }
};
