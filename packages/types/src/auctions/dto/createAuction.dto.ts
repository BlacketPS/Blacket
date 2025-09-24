import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";
import { AuctionTypeEnum } from "../../interfaces";

export class AuctionsCreateAuctionDto {
    @IsNotEmpty()
    @IsEnum(AuctionTypeEnum)
    readonly type: AuctionTypeEnum;

    @IsOptional()
    @IsNumber()
    readonly blookId?: number;

    @IsOptional()
    @IsNumber()
    readonly itemId?: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(999999999)
    readonly price: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(60)
    @Max(10080)
    readonly duration: number;

    @IsNotEmpty()
    @IsBoolean()
    readonly buyItNow: boolean;
}

export default AuctionsCreateAuctionDto;
