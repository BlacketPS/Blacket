import { Exclude } from "class-transformer";
import { PublicUser, Upload, User } from "../..";

export class NewsNewsPostEntity {
    @Exclude()
    authorId: string;

    @Exclude()
    imageId: number;

    id: number;

    title: string;
    content: string;

    image: string | Upload;

    author: PublicUser | User;

    myVote?: boolean;
    votes: {
        upvotes: number;
        downvotes: number;
    };

    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<NewsNewsPostEntity>) {
        Object.assign(this, partial);

        this.authorId = undefined;
        this.author = new PublicUser(this.author as PublicUser);

        this.imageId = undefined;
        this.image = (this.image as Upload);

        if (!this.myVote) this.myVote = null;
    }
}
