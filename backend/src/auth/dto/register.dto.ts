import { IsNotEmpty, Validate } from "class-validator";
import { IsAccessCode } from "src/core/validate/IsAccessCode.validate";

export class RegisterDto {
    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly username: string;

    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly password: string;

    @IsNotEmpty()
    @Validate(IsAccessCode)
    readonly accessCode: string;

    @IsNotEmpty()
    @Validate((value: boolean) => value === true)
    readonly acceptedTerms: boolean;
}

export default RegisterDto;
