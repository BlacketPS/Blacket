import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { User } from "src/models";
import { SequelizeService } from "src/sequelize/sequelize.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class CurrentUserPipe implements PipeTransform {
    constructor(
        private sequelizeService: SequelizeService,
        private usersService: UsersService
    ) { }

    async transform(value: any, metadata: ArgumentMetadata) {
        return this.sequelizeService.getRepository(User).findOne({ where: { id: value } });
        // return this.usersService.getUserById(value);
    }
}
