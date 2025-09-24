import { IsNotEmpty, IsOptional, MaxLength, IsString } from "class-validator";

export class ChatCreateMessageDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(2048)
    readonly content: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(8)
    readonly nonce: string;

    @IsOptional()
    @IsString()
    readonly replyingTo?: string;
}

export default ChatCreateMessageDto;
