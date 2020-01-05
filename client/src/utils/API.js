import axios from "axios";

export default {
  searchxb: function(searchTerm) {
    return axios.post("http://localhost:3001/api/xbox/search", { searchTerm });
  },

  gamestopsearch: function(searchTerm) {
    return axios.post("http://localhost:3001/api/gamestop/search", {
      searchTerm
    });
  },
  signUp: function(username, password) {
    return axios.post("http://localhost:3001/api/signup", {
      username: username,
      password: password
    });
  }

  //   game ax post<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  //   xbox<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
};
