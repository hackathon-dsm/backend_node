import { IsString } from "class-validator";

export class CallDTO {
    @IsString()
    departure: string;

    @IsString()
    destination: string;
}