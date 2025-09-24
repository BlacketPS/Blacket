import { IsArray, IsOptional, Validate } from "class-validator";
import type { PermissionType } from "../../interfaces";

export class StaffAdminUpdateGroupDto {
    @IsOptional()
    @Validate((value: string) => value.length > 0)
    readonly name?: string;

    @IsOptional()
    @Validate((value: string) => value.length > 0)
    readonly description?: string;

    @IsOptional()
    readonly imageId?: number;

    @IsOptional()
    @IsArray()
    readonly permissions?: PermissionType[];
}

export default StaffAdminUpdateGroupDto;
