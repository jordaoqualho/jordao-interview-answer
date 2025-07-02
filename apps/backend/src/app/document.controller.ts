import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Get,
} from '@nestjs/common';
import { DocumentService } from './document.service';

import {
  DocumentResponseDto,
  SaveDocumentDto,
} from './document.dto';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('save')
  async saveDocument(
    @Body() saveDto: SaveDocumentDto
  ): Promise<DocumentResponseDto> {
    try {
      return await this.documentService.saveDocument(saveDto);
    } catch (error) {
      throw new HttpException(
        `Failed to save document: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async loadDocument(
  ): Promise<DocumentResponseDto> {
    try {
      return await this.documentService.loadDocument();
    } catch (error) {
      throw new HttpException(
        `Failed to load document: ${error.message}`,
        HttpStatus.NOT_FOUND
      );
    }
  }
}
