import { IsOptional, Length, Matches, Validate } from "class-validator";

export class StaffAdminUpdatePackDto {
    @Validate((value: string) => value.length > 0)
    @IsOptional()
    readonly name?: string;

    @IsOptional()
    readonly price?: number;

    @IsOptional()
    readonly imageId?: number;

    @IsOptional()
    @Length(7)
    @Matches(/^#[0-9a-fA-F]{6}$/)
    @Validate((value: string) => value.length === 7)
    readonly innerColor: string;

    @IsOptional()
    @Length(7, 7)
    @Matches(/^#[0-9a-fA-F]{6}$/)
    @Validate((value: string) => value.length === 7)
    readonly outerColor: string;

    @IsOptional()
    @Validate((value: boolean) => typeof value === "boolean")
    readonly enabled: boolean;
}

export default StaffAdminUpdatePackDto;
