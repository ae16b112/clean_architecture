import { Module } from '@nestjs/common';
import { MongodbModule } from './mongodb/mongodb.module';
import { PostgresModule } from './postgres/postgres.module';
import * as dotenv from 'dotenv';
dotenv.config();

let Database_Module:any

if(process.env.DATABASE == 'mongodb'){
  Database_Module = MongodbModule 
}

else if(process.env.DATABASE == 'postgres'){
  Database_Module = PostgresModule
}

@Module({
  imports: [Database_Module]
})
export class DatabaseModule​​ {}



