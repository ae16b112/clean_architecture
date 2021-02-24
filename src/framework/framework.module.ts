import { Module } from '@nestjs/common';
import { SmsModule } from './sms-module/sms.module';
import { DatabaseModule } from './database/database.module';
import { GraphqlModule } from './graphql/graphql.module';



@Module({
  imports: [SmsModule, DatabaseModule, GraphqlModule]
})
export class FrameworkModule {}
