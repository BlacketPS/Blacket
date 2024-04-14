import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { DefaultService } from "./default.service";
import { Public } from "src/core/decorator";

@Controller("")
export class DefaultController {
    constructor(
        private readonly defaultService: DefaultService
    ) {}

    @Public()
    @Get()
    @HttpCode(HttpStatus.NO_CONTENT)
    get() {
        return this.defaultService.get();
    }
}
