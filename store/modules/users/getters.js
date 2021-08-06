const localName = () => {
  var n = localStorage.getItem("Nome");
  var name = JSON.parse(n);
  return name;
};

export default {
  getUserName(state) {
    if (state.user[0] != null) {
      return state.user[0];
    } else if (localName() != null) {
      var name = localName();
      return name;
    } else {
      return null;
    }
  },
  // pega imagem do user
  getUserImage: (state) => {
    if (state != null && Array.isArray(state.user)) {
      return null;
    } else {
      return state.user.content.picUser;
    }
  },
};
