import { IsNotEmpty } from "class-validator";

interface GroupMap {
    groupId: number;
    priority: number;
}

export class StaffAdminUpdateGroupPrioritiesDto {
    @IsNotEmpty({ each: true })
    readonly groupMap: GroupMap[];
}

export default StaffAdminUpdateGroupPrioritiesDto;
