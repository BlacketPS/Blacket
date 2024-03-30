import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { GetCurrentUser } from "src/core/decorator/getMe.decorator";

@Controller("users")
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }

    @Get("me")
    getMe(@GetCurrentUser() user) {
        return { user };
    }
}
