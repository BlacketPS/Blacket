import { IsNotEmpty } from "class-validator";

interface ItemShopItemMap {
    itemShopItemId: number;
    priority: number;
}

export class StaffAdminUpdateItemShopItemPriorities {
    @IsNotEmpty({ each: true })
    readonly itemShopItemMap: ItemShopItemMap[];
}

export default StaffAdminUpdateItemShopItemPriorities;
