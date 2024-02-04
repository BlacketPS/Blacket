const useLeaderboard = () => {
    const getLeaderboard = () => new Promise((resolve, reject) => fetch.get("/api/leaderboard").then(res => resolve(res.data.leaderboard)).catch(reject));

    return getLeaderboard;
}

export default useLeaderboard;