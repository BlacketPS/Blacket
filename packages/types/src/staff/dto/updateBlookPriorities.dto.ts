import { IsNotEmpty } from "class-validator";

interface BlookMap {
    blookId: number;
    priority: number;
}

export class StaffAdminUpdateBlookPrioritiesDto {
    @IsNotEmpty({ each: true })
    readonly blookMap: BlookMap[];
}

export default StaffAdminUpdateBlookPrioritiesDto;
