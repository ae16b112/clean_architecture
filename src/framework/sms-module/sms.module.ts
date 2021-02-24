import { Module } from '@nestjs/common';
import { TwilioModule } from 'nestjs-twilio';
import { smsService }  from './sms.service'
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import sms_module_config from './config/sms-module-config'

dotenv.config();


@Module({
    providers: [
        smsService
    ],

    imports: [
        TwilioModule.forRootAsync({
            imports: [ConfigModule.forRoot({
              load: [sms_module_config],
            })],
            useFactory: (sms_module_config: ConfigService) => sms_module_config.get('rohit'),
            inject: [ConfigService],
        }),
    ],

    exports: [smsService]
})

export class SmsModule {
    constructor(private smsService:smsService){}
}




