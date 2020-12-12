import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { RestModule } from './rest/rest.module';

@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile : join(process.cwd(),'src/schema.gql'),
  }), RestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
