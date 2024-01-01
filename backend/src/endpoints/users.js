import User from "#models/User";
import UserBlook from "#models/UserBlook";
import UserSetting from "#models/UserSetting";
import UserStatistic from "#models/UserStatistic";
import UserBadge from "#models/UserBadge";

export default {
    path: "/users/:user?",
    method: "get",
    options: {
        authorization: true
    },
    middlewares: ["user"],
    endpoint: (req, res) => {
        if (req.params.user) {
            User.findById(req.params.user).then(user => {
                if (!user) return res.status(404).json({ message: "This user does not exist." });

                res.status(200).json(user.toJSON());
            });
        } else {
            User.find().then(users => res.status(200).json(users.map(user => user.toJSON())));
        }
    }
}