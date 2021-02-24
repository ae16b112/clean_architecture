import * as dotenv from 'dotenv'
import { User } from 'src/user/user.entity';

dotenv.config()

export default () => ({

    mongodb: {
        type: 'mongodb',
        url: process.env.MONGODB_URL,
        synchronize: true,
        useUnifiedTopology: true,
        keepConnectionAlive: true,
        entities: [User],
    },


    postgres: {
        type: 'postgres',
        host: process.env.POSTGRES_DB_HOST,
        username: process.env.POSTGRES_DB_USERNAME,
        password: process.env.POSTGRES_DB_PASSWORD,
        database: process.env.POSTGRES_DB_NAME,
        synchronize: process.env.POSTGRES_DB_SYNC == 'true',
        entities: [User],
        port: parseInt(process.env.POSTGRES_DB_PORT),
    }

});


