export class AuctionsRecentAveragePriceEntity {
    averagePrice: number | null;
    lowestPrice: number | null;
    highestPrice: number | null;

    suspicious: boolean;

    constructor(partial: Partial<AuctionsRecentAveragePriceEntity>) {
        Object.assign(this, partial);
    }
}
