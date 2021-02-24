import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { SmsModule } from '../framework/sms-module/sms.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        SmsModule,        
    ],

    providers: [
        UserResolver, 
        UserService,         
    ]
})

export class UserModule {}
