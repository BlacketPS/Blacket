import { IsNotEmpty, Validate } from "class-validator";

export class S3UploadDto {
    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly filename: string;

    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly mimetype: string;
}