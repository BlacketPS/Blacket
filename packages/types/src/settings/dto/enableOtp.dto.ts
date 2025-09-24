import { IsNotEmpty, IsNumberString, Length, Matches } from "class-validator";

export class SettingsEnableOtpDto {
    @IsNotEmpty()
    @IsNumberString()
    @Length(6, 6)
    @Matches(/^\d{6}$/, { message: "otpCode must be a 6-digit number with no spaces" })
    readonly otpCode: string;

    constructor(partial: Partial<SettingsEnableOtpDto>) {
        Object.assign(this, partial);
    }
}

export default SettingsEnableOtpDto;
