import axios from "axios";

const useLeaderboard = () => {
    const getLeaderboard = () => new Promise((resolve, reject) => axios.get("/api/leaderboard").then(res => resolve(res.data.leaderboard)).catch(reject));

    return getLeaderboard;
}

export default useLeaderboard;