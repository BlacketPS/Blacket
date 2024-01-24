import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useLoading } from "@stores/LoadingStore";
import { useUser } from "@stores/UserStore";
import { useLeaderboard } from "@controllers/leaderboard";
import { Wrapper, FilterButton, BigPlacement, LittlePlacement, MobileFilterButton, OtherTopThree, OtherStandings } from "@components/Leaderboard";

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState(null);
    const [sortBy, setSortBy] = useState("tokens");

    const { setLoading } = useLoading();
    const { user } = useUser();

    const getLeaderboard = useLeaderboard();

    useEffect(() => {
        setLoading(true); getLeaderboard()
            .then(res => setLeaderboard(res))
            .catch(() => history.back())
            .finally(() => setLoading(false));
    }, []);

    const switchSort = () => sortBy === "tokens" ? setSortBy("experience") : setSortBy("tokens");

    if (!user) return <Navigate to="/login" />;
    else if (leaderboard) return (<>
        <FilterButton onClick={switchSort}>{sortBy === "tokens" ? "Tokens" : "Experience"}</FilterButton>

        <Wrapper>
            {leaderboard[sortBy].slice(0, 3).map((user, index) => <BigPlacement key={index} type={sortBy} placement={index + 1} user={user} />)}

            <OtherStandings>
                <MobileFilterButton onClick={switchSort}>{sortBy === "tokens" ? "Tokens" : "Experience"}</MobileFilterButton>

                <OtherTopThree>
                    {leaderboard[sortBy].slice(0, 3).map((user, index) => <LittlePlacement key={index} type={sortBy} placement={index + 1} user={user} />)}
                </OtherTopThree>
                {leaderboard[sortBy].slice(3).map((user, index) => <LittlePlacement key={index} type={sortBy} placement={index + 4} user={user} />)}
            </OtherStandings>
        </Wrapper>
    </>)
}
