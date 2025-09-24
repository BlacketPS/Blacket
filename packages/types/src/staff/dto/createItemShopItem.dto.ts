import { IsNotEmpty, IsOptional } from "class-validator";
import type { ItemShopItemType } from "../../interfaces";

export class StaffAdminCreateItemShopItemDto {
    @IsNotEmpty()
    readonly type: ItemShopItemType;

    @IsOptional()
    readonly itemId?: number;

    @IsOptional()
    readonly blookId?: number;

    @IsOptional()
    readonly titleId?: number;

    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    readonly enabled: boolean;

    @IsNotEmpty()
    readonly weekly: boolean;
}

export default StaffAdminCreateItemShopItemDto;
