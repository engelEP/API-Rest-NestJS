import { IsDateString, IsNumber, IsPositive } from "class-validator";

export class CreateInvoiceDto {
    @IsNumber()
    sellerId: number;

    @IsNumber()
    customerId: number;
    
    @IsDateString({ strict: true } as any)
    date: Date;

    @IsNumber()
    @IsPositive()
    total: number;
}
