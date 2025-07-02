import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { DocumentResponseDto, SaveDocumentDto } from './document.dto';

@Injectable()
export class DocumentService {
  private readonly documentsDir = join(process.cwd(), 'documents');

  constructor() {
    this.ensureDocumentsDirectory();
  }

  private async ensureDocumentsDirectory() {
    try {
      await fs.access(this.documentsDir);
    } catch {
      await fs.mkdir(this.documentsDir, { recursive: true });
    }
  }

  private getDocumentPath(id: string): string {
    return join(this.documentsDir, `${id}.json`);
  }

  async saveDocument(saveDto: SaveDocumentDto): Promise<DocumentResponseDto> {
    const now = new Date();

    const document: DocumentResponseDto = {
      content: saveDto.content,
      clauses: saveDto.clauses || [],
      lastModified: now,
      createdAt: now,
    };

    const documentPath = this.getDocumentPath('savedDocuments');
    await fs.writeFile(documentPath, JSON.stringify(document, null, 2));

    return document;
  }

  async loadDocument(): Promise<DocumentResponseDto> {
    try {
      const documentPath = this.getDocumentPath('savedDocuments');
      const content = await fs.readFile(documentPath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Document not found`);
    }
  }
}
