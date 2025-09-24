import { IsNotEmpty, MaxLength, IsString } from "class-validator";

export class ChatEditMessageDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(2048)
    readonly content: string;
}

export default ChatEditMessageDto;
