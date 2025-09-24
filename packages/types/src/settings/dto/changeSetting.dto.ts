import { IsNotEmpty, IsOptional } from "class-validator";

export class SettingsChangeSettingDto {
    @IsNotEmpty()
    readonly key: string;

    @IsOptional()
    readonly value: any;
}

export default SettingsChangeSettingDto;
