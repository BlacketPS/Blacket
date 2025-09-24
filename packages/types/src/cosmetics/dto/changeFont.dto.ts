import { IsNotEmpty, IsNumber } from "class-validator";

export class CosmeticsChangeFontDto {
    @IsNotEmpty()
    @IsNumber()
    readonly fontId: number;
}

export default CosmeticsChangeFontDto;