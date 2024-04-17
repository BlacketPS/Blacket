const useUsers = () => {
    const getUser = (user) => new Promise((resolve, reject) => fetch.get(`/api/users/${user}`).then(res => resolve(res.data.user)).catch(reject));

    return getUser;
}

export default useUsers;