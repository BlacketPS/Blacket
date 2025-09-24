import { IsNotEmpty, Length, Matches, Validate } from "class-validator";
import type { RarityAnimationType } from "../../interfaces";

export class StaffAdminCreateRarityDto {
    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly name: string;

    @IsNotEmpty()
    @Length(7)
    @Matches(/^#[0-9a-fA-F]{6}$/)
    @Validate((value: string) => value.length === 7)
    readonly color: string;

    @IsNotEmpty()
    readonly animationType: RarityAnimationType

    @IsNotEmpty()
    readonly experience: number;
}

export default StaffAdminCreateRarityDto;
