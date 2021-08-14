import {tokenValidator} from "/plugins/tokenValidator"

export default function authentication({ store, redirect }) {
   let isAuthenticated = store.state.loggedIn;

    // console.log('Token: '+tokenValidator)

    if (isAuthenticated){
      console.log('Middleware Logado')
    }
    else {
      console.log('Middleware Não Logado')
    }
}
