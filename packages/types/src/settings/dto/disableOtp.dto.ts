import { IsNotEmpty, IsNumberString, Length, Matches } from "class-validator";

export class SettingsDisableOtpDto {
    @IsNotEmpty()
    @IsNumberString()
    @Length(6, 6)
    @Matches(/^\d{6}$/, { message: "otpCode must be a 6-digit number with no spaces" })
    readonly otpCode: string;

    constructor(partial: Partial<SettingsDisableOtpDto>) {
        // Assign all properties except otpCode
        Object.assign(this, partial);
        // Sanitize and assign otpCode only once
        if (partial.otpCode !== undefined && partial.otpCode !== null) {
            (this as { otpCode: string }).otpCode = partial.otpCode.replace(/\s/g, "");
        }
    }
}

export default SettingsDisableOtpDto;
