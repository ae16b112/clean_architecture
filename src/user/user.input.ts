import { Field, InputType } from "@nestjs/graphql"
import {MinLength} from "class-validator"

@InputType()
export class UserInput{

    @MinLength(1)
    @Field()
    name: string

    @Field()
    LastName: string

    @Field()
    Email: string

    @Field()
    phoneNumber: string

}