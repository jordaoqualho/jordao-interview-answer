import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export interface Clause {
  id: string;
  title: string;
  content: string;
  bookmarkName: string;
}

export interface DocumentData {
  content: string;
  clauses: Clause[];
  lastModified: Date;
}

export class DocumentService {
  static async saveDocument(documentData: DocumentData): Promise<DocumentData> {
    try {
      const payload = {
        content: documentData.content,
        clauses: documentData.clauses || [],
        lastModified: new Date(),
      };

      const response = await axios.post(
        `${API_BASE_URL}/documents/save`,
        payload
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async loadDocument(): Promise<DocumentData> {
    try {
      const response = await axios.get(`${API_BASE_URL}/documents`);

      const data = response.data;

      return {
        content: data.content || '',
        clauses: data.clauses || [],
        lastModified: data.lastModified || new Date(),
      };
    } catch (error) {
      throw error;
    }
  }
}
