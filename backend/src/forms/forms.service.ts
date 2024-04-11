import { Injectable } from "@nestjs/common";
import { SequelizeService } from "src/sequelize/sequelize.service";
import { UsersService } from "src/users/users.service";
import { Repository } from "sequelize-typescript";
import { Form } from "src/models";
import { hash } from "bcrypt";

@Injectable()
export class FormsService {
    private formRepo: Repository<Form>;

    constructor(
        private sequelizeService: SequelizeService,
        private usersService: UsersService
    ) { }

    async onModuleInit() {
        this.formRepo = this.sequelizeService.getRepository(Form);
    }

    async getFormById(id: string) {
        return await this.formRepo.findOne({ where: { id } });
    }

    async getFormByUsername(username: string) {
        return await this.formRepo.findOne({ where: { username } });
    }

    async createForm(username: string, password: string, reasonToPlay: string, ipAddress: string) {
        if (await this.usersService.getUser(username) || await this.getFormByUsername(username)) return null;

        return await this.formRepo.create({ username, password: await hash(password, 10), reasonToPlay, ipAddress });
    }
}
