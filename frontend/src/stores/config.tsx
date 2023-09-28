import axios from "axios";

export const config = await axios.get("http://localhost:3000/api/config").then(res => res.data).catch(err => {
    if (err.response.status === 403) return err.response.data.error;
    else return null;
});