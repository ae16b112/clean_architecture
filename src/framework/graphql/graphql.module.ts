import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile:true,
            context: ({ req }) => ({ headers: req.headers }),
          }),  
    ],
})


export class GraphqlModule {}