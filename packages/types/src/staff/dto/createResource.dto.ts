import { IsNotEmpty, Validate } from "class-validator";

export class StaffAdminCreateResourceDto {
    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly path: string;
}

export default StaffAdminCreateResourceDto;
