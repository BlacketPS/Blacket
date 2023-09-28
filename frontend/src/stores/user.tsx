import axios from "axios";

const user = axios.get("/api/user").then(res => res.data).catch(() => null);

export { user };