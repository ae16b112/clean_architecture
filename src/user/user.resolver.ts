import { Resolver, Query, Mutation, Args, Context} from '@nestjs/graphql'
//import { User } from './user.entity';
import {UserInput } from './user.input';
import { UserService } from './user.service';
import { UserType } from './user.type';
//import { smsService } from './sms.service'
import {UseGuards} from '@nestjs/common'
import { AuthGuard } from './auth.guard';
import { User } from './user.entity';



@Resolver(of => UserType)
export class UserResolver{

    constructor(
        private userService: UserService,
        //private smsservice: smsService
    ){}


    @Query(returns => UserType)
    user(
        @Args('id') id: string,
    ){
        return this.userService.getUser(id)
    }

    @Query(returns => [UserType])
    users(){

        return this.userService.getUsers()
    }

    //@UseGuards(AuthGuard('jwt'))
    //@UseGuards(new AuthGuard())
    @Mutation(returns => UserType)
    createUser(
        @Args('userinput') userinput: UserInput
    )
    {
        //this.smsservice.sendSMS(userinput.phoneNumber)
        return this.userService.createUser(userinput);
    }

    //@UseGuards(AuthGuard('jwt'))
    @UseGuards(new AuthGuard())
    @Mutation(returns => UserType)
    deleteUser(
        @Args('id') id: string,
    )
    {
        return this.userService.removeUser(id);
    }

   //@UseGuards(AuthGuard('jwt'))
    //@UseGuards(new AuthGuard())
    @Mutation(returns => UserType)
    update(
        @Args('userinput') userinput: UserInput,
        @Args('id') id: string,
    )
    {
        //this.smsservice.sendSMS(userinput.phoneNumber)
        return this.userService.updateUser(id, userinput);
    } 

    
    @Query(returns => UserType)
    @UseGuards(new AuthGuard())
    me(@Context('user') user: User) {
        return user;
    }

    @Mutation(returns => UserType)
    async login( @Args('id') id: string, @Args('userinput') userinput:UserInput) {
        let user = await this.userService.getUser(id);
        if (!user) {
        user = await this.userService.createUser(userinput);
        }
        await this.userService.CreateToken(user);
        return user
    }
        
    
}

