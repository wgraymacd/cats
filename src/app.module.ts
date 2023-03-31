import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { logger } from './common/middleware/logger.middleware';
import { ChatModule } from './chat/chat.module';

@Module({
    imports: [CatsModule, ChatModule],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(logger)
            .forRoutes(CatsController);
    }
}
