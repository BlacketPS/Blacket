import { IsNotEmpty } from "class-validator";

interface ItemMap {
    itemId: number;
    priority: number;
}

export class StaffAdminUpdateItemPrioritiesDto {
    @IsNotEmpty({ each: true })
    readonly itemMap: ItemMap[];
}

export default StaffAdminUpdateItemPrioritiesDto;
