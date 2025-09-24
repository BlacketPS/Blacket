import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { AuctionTypeEnum } from "../../interfaces";

export class AuctionsRecentAveragePriceDto {
    @IsEnum(AuctionTypeEnum)
    readonly type?: AuctionTypeEnum;

    @IsOptional()
    @IsNumber()
    readonly blookId?: number;

    @IsOptional()
    @IsNumber()
    readonly itemId?: number;
}

export default AuctionsRecentAveragePriceDto;