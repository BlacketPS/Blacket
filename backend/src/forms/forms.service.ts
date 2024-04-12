import { Injectable } from "@nestjs/common";
import { SequelizeService } from "src/sequelize/sequelize.service";
import { UsersService } from "src/users/users.service";
import { Repository } from "sequelize-typescript";
import { Form } from "src/models";
import { FormStatus } from "src/models/form.model";
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

    async dropFormById(id: string) {
        return await this.formRepo.destroy({ where: { id } });
    }

    async createForm(username: string, password: string, reasonToPlay: string, ipAddress: string) {
        if (await this.usersService.getUser(username)) return null;

        const [
            form,
            created
        ] = await this.formRepo.findOrCreate({ where: { username, status: FormStatus.PENDING }, defaults: { password: await hash(password, 10), reasonToPlay, ipAddress } });

       return created ? form : null;
    }
}
