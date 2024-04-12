import { HttpException, HttpStatus } from "@nestjs/common";
import { NotFound } from "src/types/enums";

export class FormNotFoundException extends HttpException {
    constructor() {
        super(NotFound.UNKNOWN_FORM, HttpStatus.NOT_FOUND);
    }
}
