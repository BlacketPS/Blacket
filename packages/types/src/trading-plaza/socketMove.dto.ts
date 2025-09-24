import { IsNotEmpty, IsNumber } from "class-validator";

export class SocketTradingPlazaMoveDto {
    @IsNotEmpty()
    @IsNumber()
    readonly x: number;

    @IsNotEmpty()
    @IsNumber()
    readonly y: number;
}

export default SocketTradingPlazaMoveDto;
