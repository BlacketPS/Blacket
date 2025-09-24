import { Exclude } from "class-transformer";

export class StripeCreatePaymentMethodEntity {
    id: number;

    @Exclude()
    userId: string;

    @Exclude()
    paymentMethodId: string;

    constructor(partial: Partial<StripeCreatePaymentMethodEntity>) {
        Object.assign(this, partial);

        if (partial.userId) this.userId = undefined;
        if (partial.paymentMethodId) this.paymentMethodId = undefined;
    }
}
