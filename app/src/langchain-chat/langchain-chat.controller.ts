import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LangchainChatService } from './langchain-chat.service';
import { BasicMessageDto } from './dtos/basic-message.dto';
import { ContextAwareMessagesDto } from './dtos/context-aware-messages.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { DocumentDto, JsonDocumentDto } from './dtos/document.dto';
import { diskStorage } from 'multer';
import { PDF_BASE_PATH } from 'src/utils/constants/common.constants';

@ApiTags('langchain-chat')
@Controller('langchain-chat')
@ApiBearerAuth('Bearer')
export class LangchainChatController {
  constructor(private readonly langchainChatService: LangchainChatService) {}

  @Post('basic-chat')
  @HttpCode(200)
  @ApiOperation({ summary: 'Initiates a basic chat interaction' })
  @ApiBody({ type: BasicMessageDto })
  @ApiResponse({ status: 200, description: 'Processed chat response' })
  async basicChat(@Body() messagesDto: BasicMessageDto) {
    return await this.langchainChatService.basicChat(messagesDto);
  }

  @Post('context-aware-chat')
  @HttpCode(200)
  @ApiOperation({ summary: 'Initiates a context-aware chat interaction' })
  @ApiBody({ type: ContextAwareMessagesDto })
  @ApiResponse({ status: 200, description: 'Contextual chat response' })
  async contextAwareChat(
    @Body() contextAwareMessagesDto: ContextAwareMessagesDto,
  ) {
    return await this.langchainChatService.contextAwareChat(
      contextAwareMessagesDto,
    );
  }

  @Post('upload-document')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: PDF_BASE_PATH,
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @HttpCode(200)
  @ApiOperation({ summary: 'Handles the uploading of a PDF document' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'PDF file to upload',
    type: DocumentDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Response after processing the uploaded PDF',
  })
  async loadPDF(
    @Body() documentDto: DocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file.filename) {
      documentDto.file = file.filename;
    }
    return await this.langchainChatService.uploadPDF(documentDto);
  }

  @Post('upload-json')
  @ApiOperation({ summary: 'Upload JSON data for processing' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'JSON data processed successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiBody({
    type: JsonDocumentDto,
    required: false,
    description: 'Optional JSON data',
  })
  async uploadJSON(@Body() documentDto?: JsonDocumentDto) {
    const result = await this.langchainChatService.uploadJSON(documentDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'SUCCESS',
      data: result,
    };
  }
  @ApiBearerAuth()
  @Post('document-chat')
  @HttpCode(200)
  @ApiOperation({ summary: 'Initiates a document-context chat interaction' })
  @ApiBody({ type: BasicMessageDto })
  @ApiResponse({
    status: 200,
    description: 'Document-contextual chat response',
  })
  async documentChat(@Body() messagesDto: BasicMessageDto) {
    return await this.langchainChatService.documentChat(messagesDto);
  }

  @Post('agent-chat')
  @HttpCode(200)
  @ApiOperation({ summary: 'Initiates an agent chat interaction' })
  @ApiBody({ type: ContextAwareMessagesDto })
  @ApiResponse({ status: 200, description: 'Agent chat response' })
  async agentChat(@Body() contextAwareMessagesDto: ContextAwareMessagesDto) {
    return await this.langchainChatService.agentChat(contextAwareMessagesDto);
  }
}
