import { IsNotEmpty, Matches, Validate } from "class-validator";

export class SettingsChangeUsernameDto {
    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    @Matches(/^[a-zA-Z0-9-_]{1,16}$/)
    readonly newUsername: string;

    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly password: string;
}

export default SettingsChangeUsernameDto;
