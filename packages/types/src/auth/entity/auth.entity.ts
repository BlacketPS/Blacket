export class AuthAuthEntity {
    token: string;

    constructor(partial: Partial<AuthAuthEntity>) {
        Object.assign(this, partial);
    }
}

