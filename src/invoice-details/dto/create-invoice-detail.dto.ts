import { IsNumber } from "class-validator";

export class CreateInvoiceDetailDto {
    @IsNumber()
    invoiceId: number;

    @IsNumber()
    productId: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;
}
