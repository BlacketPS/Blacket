import { Resource } from "src/models";

export class LeaderboardEntity {
    tokens: Array<{
        id: string;
        username: string;
        titleId: string;
        color: string;
        tokens: number;
        avatar: string | Resource;
        customAvatar: string | Resource | null;
    }>;

    experience: Array<{
        id: string;
        username: string;
        titleId: string;
        color: string;
        experience: number;
        avatar: string | Resource;
        customAvatar: string | Resource | null;
    }>;

    constructor(partial: Partial<LeaderboardEntity>) {
        Object.assign(this, partial);

        this.tokens.map((user) => {
            user.avatar = (user.avatar as Resource).path;
            user.customAvatar = (user.customAvatar as Resource)?.path ?? null;
        });

        this.experience.map((user) => {
            user.avatar = (user.avatar as Resource).path;
            user.customAvatar = (user.customAvatar as Resource)?.path ?? null;
        });
    }
}
