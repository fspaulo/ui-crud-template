import jwt_decode from "jwt-decode";

export default {
  LOGIN_USER: (state, data) => {
    const jwt = "bearer " + data.content.jwt;
    const user = data.content;
    const n = {
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const userName = JSON.stringify(n);

    state.user.push(user);

    const decodedJWT = jwt_decode(jwt);
    localStorage.setItem("userId", decodedJWT.userId);

    localStorage.setItem("jwt", jwt);
    localStorage.setItem("Nome", userName);
    // localStorage.setItem("user-image", user.picUser);
    localStorage.setItem("apiKey", user.clients[0].apiKey);
  },
};
