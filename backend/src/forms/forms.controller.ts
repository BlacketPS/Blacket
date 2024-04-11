import { BadRequestException, NotFoundException, Body, ClassSerializerInterceptor, Controller, Get, Param, HttpCode, HttpStatus, Post, UseInterceptors } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FormsService } from "./forms.service";
import { Public, RealIp } from "src/core/decorator";
import { CreateDto } from "./dto";
import { CreateForm, GetForm } from "./entity";

import { BadRequest, NotFound } from "src/types/enums";

@Controller("forms")
export class FormsController {
    constructor(
        private configService: ConfigService,
        private formsService: FormsService
    ) { }

    @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    @Post("create")
    @HttpCode(HttpStatus.CREATED)
    async createForm(@Body() dto: CreateDto, @RealIp() ipAddress: string) {
        if (this.configService.get<string>("VITE_USER_FORMS_ENABLED") !== "true") throw new BadRequestException(BadRequest.FORMS_FORMS_DISABLED);

        const form = await this.formsService.createForm(dto.username, dto.password, dto.reasonToPlay, ipAddress);

        if (!form) throw new BadRequestException(BadRequest.FORMS_ALREADY_EXISTS);

        return { form: new CreateForm(form.dataValues) };
    }

    @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(":id")
    async getForm(@Param("id") id: string) {
        const form = await this.formsService.getFormById(id);

        if (!form) throw new NotFoundException(NotFound.UNKNOWN_FORM);

        return { form: new GetForm(form.dataValues) };
    }
}
