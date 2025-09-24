import { IsNotEmpty, IsString } from "class-validator";

export class AuctionsBuyAuctionDto {
    @IsNotEmpty()
    @IsString()
    readonly captchaToken: string;
}

export default AuctionsBuyAuctionDto;
