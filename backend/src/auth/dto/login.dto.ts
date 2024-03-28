import { IsNotEmpty, Validate } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly username: string;

    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly password: string;
}

export default LoginDto;
