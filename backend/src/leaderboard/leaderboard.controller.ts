import { Controller, Get } from "@nestjs/common";
import { LeaderboardService } from "./leaderboard.service";
import { LeaderboardEntity } from "./entity";

@Controller("leaderboard")
export class LeaderboardController {
    constructor(private leaderboardService: LeaderboardService) {}

    @Get()
    async getLeaderboard() {
        const leaderboard = await this.leaderboardService.getLeaderboard();

        return { leaderboard: new LeaderboardEntity(leaderboard) };
    }
}
