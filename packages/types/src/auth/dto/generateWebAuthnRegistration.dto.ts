import { IsNotEmpty, IsString } from "class-validator";

export class AuthWebAuthnGenerateWebAuthnRegistrationDto {
    @IsNotEmpty()
    @IsString()
    host: string;
}
