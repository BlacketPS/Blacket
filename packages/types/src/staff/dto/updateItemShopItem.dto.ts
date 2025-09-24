import { IsOptional } from "class-validator";
import type { ItemShopItemType } from "../../interfaces";

export class StaffAdminUpdateItemShopItemDto {
    @IsOptional()
    readonly type?: ItemShopItemType;

    @IsOptional()
    readonly itemId?: number;

    @IsOptional()
    readonly blookId?: number;

    @IsOptional()
    readonly titleId?: number;

    @IsOptional()
    readonly price?: number;

    @IsOptional()
    readonly enabled?: boolean;

    @IsOptional()
    readonly weekly?: boolean;
}

export default StaffAdminUpdateItemShopItemDto;
