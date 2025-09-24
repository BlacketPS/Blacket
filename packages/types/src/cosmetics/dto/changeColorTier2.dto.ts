import { IsNotEmpty, Matches } from "class-validator";

export class CosmeticsChangeColorTier2Dto {
    @IsNotEmpty()
    @Matches(/^(\d{1,3}\|((#[0-9a-fA-F]{6})@(\d{1,3}))((,(#[0-9a-fA-F]{6})(@(\d{1,3}))?){1,9}))$/)
    readonly color: string;
}

export default CosmeticsChangeColorTier2Dto;
