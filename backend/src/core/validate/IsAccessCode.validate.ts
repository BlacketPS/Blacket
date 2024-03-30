import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "IsAccessCode", async: false })
@Injectable()
export class IsAccessCode implements ValidatorConstraintInterface {
    constructor(protected readonly configService: ConfigService) { }

    async validate(text: string) {
        return text && text === this.configService.get<string>("SERVER_ACCESS_CODE");
    }

    defaultMessage() {
        return "Access code ($value) is invalid.";
    }
}
