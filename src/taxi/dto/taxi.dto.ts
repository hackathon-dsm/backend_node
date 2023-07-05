import { IsString } from "class-validator";

export class CreateTaxiDTO {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    car_number: string;

    @IsString()
    phone: string;
}