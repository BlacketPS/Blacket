import { IsNotEmpty, IsNumber } from "class-validator";

export class CosmeticsChangeBannerDto {
    @IsNotEmpty()
    @IsNumber()
    readonly bannerId: number;
}

export default CosmeticsChangeBannerDto;
