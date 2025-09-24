import { IsNotEmpty, IsNumber } from "class-validator";

export class MarketOpenPackDto {
    @IsNotEmpty()
	@IsNumber()
    readonly packId: number;
}

export default MarketOpenPackDto;
