import { IsNotEmpty, Validate } from "class-validator";

export class StripeCreatePaymentMethodDto {
    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly setupIntentId: string;
}

export default StripeCreatePaymentMethodDto;