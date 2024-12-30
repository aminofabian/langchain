import { Module } from '@nestjs/common';
import { LangchainChatService } from './langchain-chat.service';
import { LangchainChatController } from './langchain-chat.controller';
import { VectorStoreService } from 'src/services/vector-store.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [LangchainChatController],
  providers: [LangchainChatService, VectorStoreService],
})
export class LangchainChatModule {}
