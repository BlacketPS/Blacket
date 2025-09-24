import { IsOptional, Validate } from "class-validator";
import type { DayType } from "../../interfaces";

export class StaffAdminUpdateBlookDto {
    @Validate((value: string) => value.length > 0)
    @IsOptional()
    readonly name?: string;

    @IsOptional()
    readonly chance?: number;

    @IsOptional()
    readonly price?: number;

    @IsOptional()
    readonly rarityId?: number;

    @IsOptional()
    readonly imageId?: number;

    @IsOptional()
    readonly backgroundId?: number;

    @IsOptional()
    readonly packId?: number | null;

    @IsOptional()
    readonly onlyOnDay?: DayType;
}

export default StaffAdminUpdateBlookDto;
