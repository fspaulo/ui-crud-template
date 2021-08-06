
import axios from "axios";

/*
  * todo será substituído pelo URL principal do myWMS
 */
const API = axios.create({
  baseURL: "https://api.tracebox.com.br/dev/",
});

export default API;
