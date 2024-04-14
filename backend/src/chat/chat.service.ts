import { Injectable } from "@nestjs/common";
import { SequelizeService } from "src/sequelize/sequelize.service";
import { Message, User, Resource } from "src/models";
import { Repository } from "sequelize-typescript";

@Injectable()
export class ChatService {
    private messageRepo: Repository<Message>;
    private userRepo: Repository<User>;
    private resourceRepo: Repository<Resource>;

    constructor(
        private readonly sequelizeService: SequelizeService
    ) {
        this.messageRepo = this.sequelizeService.getRepository(Message);
        this.userRepo = this.sequelizeService.getRepository(User);
        this.resourceRepo = this.sequelizeService.getRepository(Resource);
    }

    async getMessages(room: Message["roomId"] = 0, limit: number = 50) {
        return await this.messageRepo.findAll({
            order: [
                [
                    "createdAt",
                    "DESC"
                ]
            ],
            limit: limit,
            include: [
                {
                    model: this.userRepo,
                    as: "author",
                    attributes: [
                        "id",
                        "username",
                        "titleId",
                        "color"
                    ],
                    include: [
                        {
                            model: this.resourceRepo,
                            as: "avatar"
                        },
                        {
                            model: this.resourceRepo,
                            as: "customAvatar"
                        }
                    ]
                },
                {
                    model: this.messageRepo,
                    as: "replyingTo",
                    include: [
                        {
                            model: this.userRepo,
                            as: "author",
                            attributes: [
                                "id",
                                "username",
                                "titleId",
                                "color"
                            ],
                            include: [
                                {
                                    model: this.resourceRepo,
                                    as: "avatar"
                                },
                                {
                                    model: this.resourceRepo,
                                    as: "customAvatar"
                                }
                            ]
                        }
                    ],
                    attributes: {
                        exclude: [
                            "authorId",
                            "roomId",
                            "replyingToId"
                        ]
                    }
                }
            ],
            attributes: {
                exclude: [
                    "authorId",
                    "roomId",
                    "replyingToId"
                ]
            },
            where: {
                roomId: room
            }
        });
    }
}
