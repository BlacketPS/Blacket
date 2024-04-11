import { Injectable } from "@nestjs/common";
import { SequelizeService } from "src/sequelize/sequelize.service";
import { UsersService } from "src/users/users.service";
import { Repository } from "sequelize-typescript";
import { Form } from "src/models";
import { hash } from "bcrypt";

import { AcceptStatus } from "src/models/form.model";

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

    async getCountOfPendingUsername(username: string): Promise<number> {
        return await this.formRepo.count({ where: { username, acceptStatus: AcceptStatus.PENDING } });
    }

    async createForm(username: string, password: string, reasonToPlay: string, ipAddress: string) {
        if (await this.usersService.getUser(username) || await this.getCountOfPendingUsername(username) > 0) return null;

        return await this.formRepo.create({ username, password: await hash(password, 10), reasonToPlay, ipAddress });
    }
}
