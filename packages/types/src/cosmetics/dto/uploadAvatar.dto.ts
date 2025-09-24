import { IsNotEmpty, IsNumber } from "class-validator";

export class CosmeticsUploadAvatarDto {
    @IsNotEmpty()
    @IsNumber()
    readonly uploadId: number;
}

export default CosmeticsUploadAvatarDto;
