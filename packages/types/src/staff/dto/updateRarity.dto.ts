import { IsOptional, Length, Matches, Validate } from "class-validator";
import type { RarityAnimationType } from "../../interfaces";

export class StaffAdminUpdateRarityDto {
    @Validate((value: string) => value.length > 0)
    @IsOptional()
    readonly name?: string;

    @IsOptional()
    @Length(7)
    @Matches(/^#[0-9a-fA-F]{6}$/)
    @Validate((value: string) => value.length === 7)
    readonly color?: string;

    @IsOptional()
    readonly animationType?: RarityAnimationType;

    @IsOptional()
    readonly experience?: number;
}

export default StaffAdminUpdateRarityDto;
