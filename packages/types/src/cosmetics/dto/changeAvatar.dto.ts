import { IsNotEmpty, IsNumber } from "class-validator";

export class CosmeticsChangeAvatarDto {
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;
}

export default CosmeticsChangeAvatarDto;
