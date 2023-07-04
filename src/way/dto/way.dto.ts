import { IsString } from "class-validator";

export class WayDTO {
    @IsString()
    departure: string;

    @IsString()
    destination: string;
}