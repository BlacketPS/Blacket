import { IsNotEmpty, Validate } from "class-validator";

export class StripeCreateSetupIntentDto {
    @IsNotEmpty()
    @Validate((value: string) => value.length > 0)
    readonly paymentMethodId: string;
}

export default StripeCreateSetupIntentDto;