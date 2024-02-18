import { IsNotEmpty } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    username:string
    @IsNotEmpty()
    age:number
    @IsNotEmpty()
    hobbies:string[]
}
