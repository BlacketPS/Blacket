import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLoading } from "@stores/LoadingStore";
import { useUser } from "@stores/UserStore";
import { useLeaderboard as useLeaderboardStore } from "@stores/LeaderboardStore";
import { useLeaderboard as useLeaderboardController } from "@controllers/leaderboard";
import { Wrapper, FilterButton, BigPlacement, LittlePlacement, MobileFilterButton, OtherTopThree, OtherStandings } from "@components/Leaderboard";

export default function Leaderboard() {
    const { setLoading } = useLoading();
    const { user } = useUser();
    const { sortBy, setSortBy } = useLeaderboardStore();
    const { leaderboard, setLeaderboard } = useLeaderboardStore();

    const getLeaderboard = useLeaderboardController();

    useEffect(() => {
        if (!leaderboard) {
            setLoading("Loading leaderboard");
            getLeaderboard()
                .then(res => setLeaderboard({ fetchedAt: Date.now(), leaderboard: res }))
                .catch(() => history.back())
                .finally(() => setLoading(false));
        } else if (leaderboard && Date.now() - leaderboard.fetchedAt > 60000) getLeaderboard()
            .then(res => setLeaderboard({ fetchedAt: Date.now(), leaderboard: res }))
            .catch(() => history.back())
    }, []);

    const switchSort = () => sortBy === "tokens" ? setSortBy("experience") : setSortBy("tokens");

    if (!user) return <Navigate to="/login" />;
    else if (leaderboard) return (<>
        <FilterButton onClick={switchSort}>{sortBy === "tokens" ? "Tokens" : "Experience"}</FilterButton>

        <Wrapper>
            {leaderboard.leaderboard[sortBy].slice(0, 3).map((user, index) => <BigPlacement key={index} type={sortBy} placement={index + 1} user={user} />)}

            <OtherStandings>
                <MobileFilterButton onClick={switchSort}>{sortBy === "tokens" ? "Tokens" : "Experience"}</MobileFilterButton>

                <OtherTopThree>
                    {leaderboard.leaderboard[sortBy].slice(0, 3).map((user, index) => <LittlePlacement key={index} type={sortBy} placement={index + 1} user={user} />)}
                </OtherTopThree>
                {leaderboard.leaderboard[sortBy].slice(3).map((user, index) => <LittlePlacement key={index} type={sortBy} placement={index + 4} user={user} />)}
            </OtherStandings>
        </Wrapper>
    </>)
}
