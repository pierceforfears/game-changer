import axios from "axios";

export default {
  searchxb: function(searchTerm) {
    return axios.post("/api/xbox/search", { searchTerm });
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
  }
};
