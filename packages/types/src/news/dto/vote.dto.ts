import { IsNotEmpty, IsBoolean } from "class-validator";

export class NewsVoteDto {
    @IsNotEmpty()
	@IsBoolean()
    readonly value: boolean;
}

export default NewsVoteDto;
