import { IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from "class-validator";

export class StripeCreatePaymentIntentDto {
    @IsOptional()
    @IsNumber()
    @Validate((value: number) => value > 0 && value <= 100)
    readonly quantity?: number;

    @IsNotEmpty()
    @IsNumber()
    readonly paymentMethodId: number;
}

export default StripeCreatePaymentIntentDto;
