import { IsNotEmpty, IsOptional, Validate } from "class-validator";
import { DayTypeEnum } from "../../interfaces";

export class StaffAdminCreateBlookDto {
    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly name: string;

    @IsNotEmpty()
    readonly chance: number;

    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    readonly rarityId: number;

    @IsNotEmpty()
    readonly imageId: number;

    @IsNotEmpty()
    readonly backgroundId: number;

    @IsNotEmpty()
    @IsOptional()
    readonly packId?: number | null;

    @IsNotEmpty()
    @IsOptional()
    readonly onlyOnDay?: DayTypeEnum | null;
}

export default StaffAdminCreateBlookDto;
