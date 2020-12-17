import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RestModule } from './rest/rest.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 7777,
      username: 'postgres',
      password: '12345', //real pw..............:(
      database: 'nuber-eats',
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    RestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

//Error??????????????????????????????

//[Nest] 24240   - 2020. 12. 16. 오후 1:42:46   [ExceptionHandler] ����� "postgres"�� password ������ �����߽��ϴ� +94ms
// error: ����� "postgres"�� password ������ �����߽��ϴ�
//     at Parser.parseErrorMessage (C:\Users\user\Desktop\nuber-eats-backend\node_modules\pg-protocol\dist\parser.js:278:15)
//     at Parser.handlePacket (C:\Users\user\Desktop\nuber-eats-backend\node_modules\pg-protocol\dist\parser.js:126:29)
//     at Parser.parse (C:\Users\user\Desktop\nuber-eats-backend\node_modules\pg-protocol\dist\parser.js:39:38)
//     at Socket.<anonymous> (C:\Users\user\Desktop\nuber-eats-backend\node_modules\pg-protocol\dist\index.js:10:42)
//     at Socket.emit (events.js:315:20)
//     at addChunk (_stream_readable.js:309:12)
//     at readableAddChunk (_stream_readable.js:284:9)
//     at Socket.Readable.push (_stream_readable.js:223:10)
//     at TCP.onStreamRead (internal/stream_base_commons.js:188:23)
