import { Length, Matches, Validate, IsOptional } from "class-validator";

export class SettingsChangeChatColorDto {
    @IsOptional()
    @Length(7)
    @Matches(/^#[0-9a-fA-F]{6}$/)
    @Validate((value: string | null) => value === null || value.length === 7)
    readonly color: string | null;
}

export default SettingsChangeChatColorDto;
