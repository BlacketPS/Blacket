import { IsNotEmpty, IsNumber } from "class-validator";

export class CosmeticsChangeTitleDto {
    @IsNotEmpty()
    @IsNumber()
    readonly titleId: number;
}

export default CosmeticsChangeTitleDto;
