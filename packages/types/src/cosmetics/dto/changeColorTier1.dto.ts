import { IsNotEmpty, Length, Matches, Validate } from "class-validator";

export class CosmeticsChangeColorTier1Dto {
    @IsNotEmpty()
    @Length(7)
    @Matches(/^#[0-9a-fA-F]{6}$/)
    @Validate((value: string) => value.length === 7)
    readonly color: string;
}

export default CosmeticsChangeColorTier1Dto;
