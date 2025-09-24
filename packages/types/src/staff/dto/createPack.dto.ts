import { IsNotEmpty, Length, Matches, Validate } from "class-validator";

export class StaffAdminCreatePackDto {
    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly name: string;

    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    readonly imageId: number;

    @IsNotEmpty()
    readonly iconId: number;

    @IsNotEmpty()
    @Length(7)
    @Matches(/^#[0-9a-fA-F]{6}$/)
    @Validate((value: string) => value.length === 7)
    readonly innerColor: string;

    @IsNotEmpty()
    @Length(7, 7)
    @Matches(/^#[0-9a-fA-F]{6}$/)
    @Validate((value: string) => value.length === 7)
    readonly outerColor: string;

    @IsNotEmpty()
    @Validate((value: boolean) => typeof value === "boolean")
    readonly enabled: boolean;
}

export default StaffAdminCreatePackDto;
