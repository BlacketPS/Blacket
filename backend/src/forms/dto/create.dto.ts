import { IsNotEmpty, Validate } from "class-validator";

export class CreateDto {
    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly username: string;

    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly password: string;

    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly reasonToPlay: string;
}

export default CreateDto;
