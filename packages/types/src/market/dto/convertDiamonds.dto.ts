import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class MarketConvertDiamondsDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    readonly amount: number;
}

export default MarketConvertDiamondsDto;
