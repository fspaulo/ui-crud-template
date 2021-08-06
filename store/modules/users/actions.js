import Users from "../../../api/Users";

export const login = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    console.log("pay "+payload)
    Users.login(payload).then((res) => {
        let response = res.data;
        console.log("res "+response)
        commit("LOGIN_USER", response);
        resolve(response.message);
      })
      .catch((err) => {
        console.log("Erro ao logar", err);
        if (err.response)
          reject(err.response.data.message);
        else
          console.log(err);
      });
  });
};

