import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { AuctionTypeEnum } from "../../interfaces";

export class AuctionsSearchAuctionDto {
    @IsOptional()
    @IsNumber()
    readonly id?: number;

    @IsOptional()
    @IsEnum(AuctionTypeEnum)
    readonly type?: AuctionTypeEnum;

    @IsOptional()
    @IsString()
    readonly query?: string;

    @IsOptional()
    @IsNumber()
    readonly blookId?: number;

    @IsOptional()
    @IsNumber()
    readonly itemId?: number;

    @IsOptional()
    @IsNumber()
    readonly rarityId?: number;

    @IsOptional()
    @IsBoolean()
    readonly shiny?: boolean;

    @IsOptional()
    @IsBoolean()
    readonly endingSoon?: boolean;

    @IsOptional()
    @IsBoolean()
    readonly buyItNow?: boolean;

    @IsOptional()
    @IsString()
    readonly seller?: string;
}

export default AuctionsSearchAuctionDto;
