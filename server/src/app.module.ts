import {Module} from '@nestjs/common';
import {MessagesModule} from './messages/messages.module';
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MessagesModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
