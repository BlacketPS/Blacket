import axios from "axios";

const config = await axios.get("http://localhost:3000/api/config").then(res => res.data)

export { config };