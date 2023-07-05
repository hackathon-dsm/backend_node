import { IsNumber, IsString } from "class-validator";

export class CreateUserDTO {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    caution: string;
}

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

export class LoginUserDTO {
    @IsString()
    email: string;

    @IsString()
    password: string;
}

export class UserResDTO {
    @IsNumber()
    id: number;

    @IsString()
    access_token: string;
}