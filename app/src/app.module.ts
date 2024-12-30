import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LangchainChatModule } from './langchain-chat/langchain-chat.module';
import { VectorStoreService } from './services/vector-store.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, LangchainChatModule],
  controllers: [],
  providers: [VectorStoreService],
})
export class AppModule {}
