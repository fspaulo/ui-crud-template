import jwt_decode from "jwt-decode";

const tokenValidator = () => {
  var token = localStorage.getItem("jwt");
  console.log("token: "+token)
  try {
    let decodedToken = jwt_decode(token, {header: false});
    let userId = localStorage.getItem("userId");
    if (userId !== decodedToken.userId || decodedToken === null ||
      decodedToken.exp < Date.now() / 1000) {
      return false;
    } else {
      console.log("token válido");
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export {tokenValidator};
