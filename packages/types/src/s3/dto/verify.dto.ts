import { IsNotEmpty, Validate } from "class-validator";

export class S3VerifyDto {
    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly uploadId: string;
}