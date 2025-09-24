import { IsNotEmpty, IsNumber } from "class-validator";

export class CosmeticsUploadBannerDto {
    @IsNotEmpty()
    @IsNumber()
    readonly uploadId: number;
}

export default CosmeticsUploadBannerDto;
