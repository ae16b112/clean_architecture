import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FrameworkModule } from './framework/framework.module';
import { PostgresModule } from './framework/database/postgres/postgres.module';
import { MongodbModule } from './framework/database/mongodb/mongodb.module';
import { GraphqlModule } from './framework/graphql/graphql.module';
import { AuthModule } from './authz/auth.module';



@Module({
  imports: [
    //GraphqlModule,
    UserModule,
    FrameworkModule,
    //PostgresModule,
    AuthModule,
    //MongodbModule,
  ],
})


export class AppModule {}
