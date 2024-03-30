import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { GetCurrentUser } from "src/core/decorator/getUser.decorator";

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
