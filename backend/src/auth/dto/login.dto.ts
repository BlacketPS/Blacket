import { IsNotEmpty, IsOptional, Validate } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly username: string;

    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly password: string;

    @IsOptional()
    readonly otpCode?: string;
}

export default LoginDto;
