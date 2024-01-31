import axios from "axios";

const useUsers = () => {
    const getUser = (user) => new Promise((resolve, reject) => axios.get(`/api/users/${user}`).then(res => resolve(res.data.user)).catch(reject));

    return getUser;
}

export default useUsers;