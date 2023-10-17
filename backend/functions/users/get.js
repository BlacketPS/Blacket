!blacket.users && (blacket.users = {});

export default blacket.users.get = async (id) => new Promise((resolve, reject) => {
    resolve({ id });
});