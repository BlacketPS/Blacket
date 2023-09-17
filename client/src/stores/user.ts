import axios from "axios";

const user = axios.get("http://localhost:3000/api/user").then(res => res.data).catch(() => null);

export { user };