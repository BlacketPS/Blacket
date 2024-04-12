import { HttpException, HttpStatus } from "@nestjs/common";
import { Conflict } from "src/types/enums";

export class FormAlreadyExistsException extends HttpException {
    constructor() {
        super(Conflict.FORMS_ALREADY_EXISTS, HttpStatus.CONFLICT);
    }
}
