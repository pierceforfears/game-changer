import axios from "axios";

export default {
  search: function(searchTerm) {
    return axios.post("http://localhost:3001/api/search", { searchTerm });
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
