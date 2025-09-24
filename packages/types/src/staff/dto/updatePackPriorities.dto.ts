import { IsNotEmpty } from "class-validator";

interface PackMap {
    packId: number;
    priority: number;
}

export class StaffAdminUpdatePackPrioritiesDto {
    @IsNotEmpty({ each: true })
    readonly packMap: PackMap[];
}

export default StaffAdminUpdatePackPrioritiesDto;
