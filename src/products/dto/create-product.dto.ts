import { IsDecimal, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;
    
    @IsString()
    description: string;

    @IsString()
    unitOfMeasure: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    stock: number;
}
