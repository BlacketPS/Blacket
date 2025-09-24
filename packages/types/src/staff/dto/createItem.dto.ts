import { IsNotEmpty, IsOptional, Validate } from "class-validator";
import type { ItemType } from "../../interfaces";

export class StaffAdminCreateItemDto {
    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly name: string;

    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly description: string;

    @IsNotEmpty()
    readonly rarityId: number;

    @IsNotEmpty()
    readonly imageId: number;

    @IsNotEmpty()
    readonly type: ItemType;

    @IsNotEmpty()
    readonly canUse: boolean;

    @IsNotEmpty()
    readonly canAuction: boolean;

    @IsNotEmpty()
    readonly canTrade: boolean;

    @IsNotEmpty()
    readonly maxUses: number;

    @IsOptional()
    readonly boosterDuration?: number;
}

export default StaffAdminCreateItemDto;
