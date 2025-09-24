import { IsArray, IsNotEmpty, IsOptional, Validate } from "class-validator";
import type { PermissionType } from "../../interfaces";

export class StaffAdminCreateGroupDto {
    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly name: string;

    @IsOptional()
    @Validate((value: string) => value.length > 0)
    readonly description?: string;

    @IsOptional()
    readonly imageId?: number;

    @IsNotEmpty()
    @IsArray()
    readonly permissions: PermissionType[];
}

export default StaffAdminCreateGroupDto;
