import { ClassSerializerInterceptor, Controller, Get, NotFoundException, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { GetCurrentUser } from "src/core/decorator/getUser.decorator";
import { PublicUser } from "./entity/publicUser.entity";
import { User } from "src/models";

@Controller("users")
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get("me")
    getMe(@GetCurrentUser() user: User) {
        if (!user) throw new NotFoundException("User not found");
        else return { user: new PublicUser(user) };
    }
}
