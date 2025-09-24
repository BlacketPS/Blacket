export class PersonalBoost {
    multiplier: number;
    expiresAt: Date;

    constructor(partial: Partial<PersonalBoost>) {
        Object.assign(this, partial);
    }
}
