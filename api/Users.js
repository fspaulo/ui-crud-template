import API from "./api";

var END_POINT = "users";

export default {
  login(value) {
    return API.post(`${END_POINT}/login`, value);
  },
};
