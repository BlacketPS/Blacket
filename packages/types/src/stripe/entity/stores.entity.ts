export class StripeStoreEntity {
    id: number;
    name: string;
    description: string;
    priority: number;
    products: number[];
    createdAt: Date;
    updatedAt: Date;
    active: boolean;

    constructor(partial: Partial<StripeStoreEntity>) {
        Object.assign(this, partial);
    }
}
