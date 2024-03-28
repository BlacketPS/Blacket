import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { DefaultService } from "./default.service";

@Controller("")
export class DefaultController {
    constructor(
        private readonly defaultService: DefaultService
    ) {}

    @Get()
    @HttpCode(HttpStatus.NO_CONTENT)
    async get() {
        return this.defaultService.get();
    }
}
