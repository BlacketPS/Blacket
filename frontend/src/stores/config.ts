import axios from "axios";

const config = await axios.get("/api/config").then(res => res.data).catch(() => {

});

export { config };