import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType('User')
export class UserType {

    @Field(type => ID)
    id:string

    @Field()
    name:string

    @Field()
    LastName:string

    @Field()
    Email:string

    @Field()
    phoneNumber: string
}