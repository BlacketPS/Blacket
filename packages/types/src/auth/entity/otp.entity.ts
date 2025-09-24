export class AuthOtpEntity {
    otpSecret: string;

    constructor(partial: Partial<AuthOtpEntity>) {
        Object.assign(this, partial);
    }
}
