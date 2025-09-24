import { IsOptional, Validate } from "class-validator";

export class StaffAdminUpdateResourceDto {
    @IsOptional()
    @Validate((value: string) => value.length > 0)
    readonly path: string;
}

export default StaffAdminUpdateResourceDto;
