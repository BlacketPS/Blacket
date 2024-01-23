import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useLoading } from "@stores/LoadingStore";
import { useUser } from "@stores/UserStore";
import { useLeaderboard } from "@controllers/leaderboard";
import { Wrapper, BigPlacement, LittlePlacement, OtherTopThree, OtherStandings } from "@components/Leaderboard";

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState(null);

    const { setLoading } = useLoading();
    const { user } = useUser();

    const getLeaderboard = useLeaderboard();

    useEffect(() => {
        setLoading(true); getLeaderboard()
            .then(res => setLeaderboard(res.users))
            .catch(() => history.back())
            .finally(() => setLoading(false));
    }, []);

    if (!user) return <Navigate to="/login" />;
    else if (leaderboard) return (
        <Wrapper>
            {leaderboard.slice(0, 3).map((user, index) => <BigPlacement key={index} placement={index + 1} user={user} />)}

            <OtherStandings>
                <OtherTopThree>
                    {leaderboard.slice(0, 3).map((user, index) => <LittlePlacement key={index} placement={index + 1} user={user} />)}
                </OtherTopThree>
                {leaderboard.slice(3).map((user, index) => <LittlePlacement key={index} placement={index + 4} user={user} />)}
            </OtherStandings>
        </Wrapper>
    )
}
