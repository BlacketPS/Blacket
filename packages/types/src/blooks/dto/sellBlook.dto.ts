import { ArrayMinSize, IsArray, IsNotEmpty } from "class-validator";

export class BlooksSellBlookDto {
    @IsNotEmpty({ each: true })
    @IsArray()
    @ArrayMinSize(1)
    readonly blooks: number[];
}

export default BlooksSellBlookDto;
