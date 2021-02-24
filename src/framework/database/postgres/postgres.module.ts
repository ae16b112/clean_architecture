import { ConfigModule, ConfigService} from '@nestjs/config';
import databaseconfig from '../config/database.config'
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.forRoot({
              load: [databaseconfig],
            })],
            useFactory: (databaseconfig: ConfigService) => databaseconfig.get('postgres'),
            inject: [ConfigService],
        }),
    ],
})
export class PostgresModule {}



