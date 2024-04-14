import { Module } from "@nestjs/common";
import { LeaderboardController } from "./leaderboard.controller";
import { LeaderboardService } from "./leaderboard.service";

@Module({
  controllers: [LeaderboardController],
  providers: [LeaderboardService]
})
export class LeaderboardModule {}
