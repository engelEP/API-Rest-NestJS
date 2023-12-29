import { IsNumber, IsString, isString } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsString()
    address: string;

    @IsNumber()
    phone: number;
}
