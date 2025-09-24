export class StripeCreateSetupIntentEntity {
    id: string;

    clientSecret: string;

    constructor(partial: Partial<StripeCreateSetupIntentEntity>) {
        Object.assign(this, partial);
    }
}
