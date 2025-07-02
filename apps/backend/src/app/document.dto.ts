export class SaveDocumentDto {
  content: string;
  clauses?: ClauseDto[];
  lastModified: Date;
}
export class DocumentResponseDto {
  content: string;
  clauses: ClauseDto[];
  lastModified: Date;
  createdAt: Date;
}

export class ClauseDto {
  id: string;
  title: string;
  content: string;
  bookmarkName: string;
}
