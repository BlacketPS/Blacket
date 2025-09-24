import { IsNotEmpty, Validate } from "class-validator";

export class DiscordLinkDto {
    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly code: string;
}

export default DiscordLinkDto;
