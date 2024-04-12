import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Param, HttpCode, HttpStatus, Post, UseInterceptors } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FormsService } from "./forms.service";
import { Public, RealIp } from "src/core/decorator";
import { CreateDto } from "./dto";
import { CreateFormEntity, GetFormEntity } from "./entity";

import { BadRequest } from "src/types/enums";
import { FormAlreadyExistsException, FormNotFoundException } from "./exception";

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

        if (!form) throw new FormAlreadyExistsException();

        return new CreateFormEntity(form.toJSON());
    }

    @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(":id")
    async getForm(@Param("id") id: string) {
        if (this.configService.get<string>("VITE_USER_FORMS_ENABLED") !== "true") throw new BadRequestException(BadRequest.FORMS_FORMS_DISABLED);

        const form = await this.formsService.getFormById(id);

        if (!form) throw new FormNotFoundException();

        return new GetFormEntity(form.toJSON());
    }
}
