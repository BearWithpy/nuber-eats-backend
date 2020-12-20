import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RestModule } from './rest/rest.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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

// What's Wrong with it

// [Nest] 3416   - 2020. 12. 20. 오후 2:27:32   [InstanceLoader] GraphQLModule dependencies initialized +1ms
// internal/crypto/keys.js:322
//     throw new ERR_INVALID_ARG_TYPE(
//     ^

// TypeError [ERR_INVALID_ARG_TYPE]: The "key" argument must be of type string or an instance of Buffer, TypedArray, DataView, or KeyObject. Received null
//     at prepareSecretKey (internal/crypto/keys.js:322:11)
//     at new Hmac (internal/crypto/hash.js:111:9)
//     at Object.createHmac (crypto.js:147:10)
//     at createHMAC (C:\Users\user\Desktop\nuber-eats-backend\node_modules\pg\lib\sasl.js:133:17)
//     at Hi (C:\Users\user\Desktop\nuber-eats-backend\node_modules\pg\lib\sasl.js:137:13)
//     at Object.continueSession (C:\Users\user\Desktop\nuber-eats-backend\node_modules\pg\lib\sasl.js:32:24)
//     at Client._handleAuthSASLContinue (C:\Users\user\Desktop\nuber-eats-backend\node_modules\pg\lib\client.js:257:10)
//     at Connection.emit (events.js:315:20)
//     at C:\Users\user\Desktop\nuber-eats-backend\node_modules\pg\lib\connection.js:115:12
//     at Parser.parse (C:\Users\user\Desktop\nuber-eats-backend\node_modules\pg-protocol\dist\parser.js:40:17) {
//   code: 'ERR_INVALID_ARG_TYPE'
// }
