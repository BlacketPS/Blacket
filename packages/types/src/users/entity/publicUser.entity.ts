import { Exclude } from "class-transformer";
import { PrivateUser } from "./privateUser.entity";
import { UserSettings } from "./interface";
import { PermissionType, UserPaymentMethod, UserSubscription, UserWebAuthn } from "../../interfaces";

export class PublicUser extends PrivateUser {
    @Exclude()
    email: string = undefined;

    @Exclude()
    emailVerified: boolean = undefined;

    @Exclude()
    paymentMethods: UserPaymentMethod[] = undefined;

    @Exclude()
    subscriptions: UserSubscription[] = [];

    @Exclude()
    authMethods: UserWebAuthn[] = undefined;

    @Exclude()
    settings: UserSettings = undefined;

    @Exclude()
    permissions: PermissionType[] = undefined;

    @Exclude()
    lastClaimed: Date = undefined;

    @Exclude()
    lastSeen: Date = undefined;

    constructor(partial: Partial<PublicUser>) {
        super(partial);

        this.email = undefined;
        this.emailVerified = undefined;
        this.paymentMethods = undefined;
        this.subscriptions = undefined;
        this.authMethods = undefined;
        this.settings = undefined;
        this.permissions = undefined;
        this.lastClaimed = undefined;
        this.lastSeen = undefined;
    }
}
