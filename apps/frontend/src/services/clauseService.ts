import { DocumentEditor } from '@syncfusion/ej2-react-documenteditor';
import { Clause } from './documentService';

export class ClauseService {
  constructor(private Document: DocumentEditor) {}

  isReady(): boolean {
    const editor = this.Document?.editor;
    const selection = this.Document?.selection;

    if (!editor || !selection) {
      return false;
    }

    try {
      const documentHelper = editor.documentHelper;
      if (!documentHelper) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  async waitForBookmarkReady(maxWaitTime = 15000): Promise<boolean> {
    const startTime = Date.now();

    while (Date.now() - startTime < maxWaitTime) {
      if (this.isReady() && this.canInsertBookmarks()) {
        try {
          const editor = this.Document.editor;
          const selection = this.Document.selection;

          if (selection && selection.startOffset !== undefined) {
            const documentHelper = editor.documentHelper;
            if (documentHelper) {
              const testResult = await this.testBookmarkInsertion();
              if (testResult) {
                return true;
              }
            }
          }
        } catch (error) {}
      }
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    return false;
  }

  private canInsertBookmarks(): boolean {
    try {
      const editor = this.Document.editor;
      if (!editor) return false;

      const selection = this.Document.selection;
      if (!selection) return false;

      return true;
    } catch (error) {
      return false;
    }
  }

  private async testBookmarkInsertion(): Promise<boolean> {
    try {
      const editor = this.Document.editor;
      const selection = this.Document.selection;

      if (!editor || !selection) return false;

      const testBookmarkName = '_test_bookmark_' + Date.now();

      editor.insertBookmark(testBookmarkName);
      editor.deleteBookmark(testBookmarkName);

      return true;
    } catch (error) {
      return false;
    }
  }

  async insertClause(clause: Clause): Promise<boolean> {
    try {
      const editor = this.Document.editor;
      const selection = this.Document.selection;

      if (!editor || !selection) {
        return false;
      }

      const documentHelper = editor.documentHelper;
      if (!documentHelper) {
        return false;
      }

      selection.moveToDocumentEnd();
      const startPosition = selection.startOffset;
      const text = `${clause.content}\n\n`;
      editor.insertText(text);
      const endPosition = selection.startOffset;
      selection.select(startPosition, endPosition);

      if (this.canInsertBookmarks()) {
        try {
          editor.insertBookmark(clause.bookmarkName);
        } catch (bookmarkError) {}
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  async removeClause(clause: { bookmarkName: string }): Promise<boolean> {
    const editor = this.Document.editor;
    const selection = this.Document.selection;

    if (!editor || !selection) {
      return false;
    }

    selection.selectBookmark(clause.bookmarkName, false);

    editor.delete();
    editor.deleteBookmark(clause.bookmarkName);

    return true;
  }

  removeAllClauses(clauses: Clause[]): boolean {
    const failed = [];
    for (const clause of clauses) {
      const ok = this.removeClause(clause);
      if (!ok) failed.push(clause);
    }

    if (failed.length === 0) return true;

    return this.clearDocumentContent();
  }

  private clearDocumentContent(): boolean {
    const editor = this.Document.editor;
    const selection = this.Document.selection;
    if (!editor || !selection) return false;

    selection.selectAll();

    editor.delete();

    return true;
  }

  private moveToEndOfDocument(): void {
    const sel = this.Document.selection;
    if (!sel) return;

    sel.moveToDocumentEnd();
  }

  getBookmarkContent(bookmarkName: string): string {
    try {
      const editor = this.Document.editor;
      const selection = this.Document.selection;

      if (!editor || !selection) {
        return '';
      }

      const currentStart = selection.startOffset;
      const currentEnd = selection.endOffset;

      const originalScrollBehavior =
        document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';

      selection.selectBookmark(bookmarkName, false);
      const content = selection.text;

      if (currentStart !== undefined && currentEnd !== undefined) {
        selection.select(currentStart, currentEnd);
      }

      document.documentElement.style.scrollBehavior = originalScrollBehavior;

      return content || '';
    } catch (error) {
      return '';
    }
  }

  getAllBookmarkContents(clauses: Clause[]): Record<string, string> {
    const bookmarkContents: Record<string, string> = {};

    for (const clause of clauses) {
      const content = this.getBookmarkContent(clause.bookmarkName);
      bookmarkContents[clause.bookmarkName] = content;
    }

    return bookmarkContents;
  }

  updateClauseContent(clause: Clause): boolean {
    try {
      const bookmarkContent = this.getBookmarkContent(clause.bookmarkName);

      if (bookmarkContent) {
        const lines = bookmarkContent.split('\n');
        const title = lines[0] || '';
        const content = lines.slice(2).join('\n').trim();

        clause.title = title;
        clause.content = content;

        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  updateAllClauseContents(clauses: Clause[]): Clause[] {
    const updatedClauses: Clause[] = [];

    for (const clause of clauses) {
      const updatedClause = { ...clause };
      this.updateClauseContent(updatedClause);
      updatedClauses.push(updatedClause);
    }

    return updatedClauses;
  }

  getBookmarkContentRich(bookmarkName: string): string {
    try {
      const editor = this.Document.editor;
      const selection = this.Document.selection;
      if (!editor || !selection) {
        return '';
      }

      const currentStart = selection.startOffset;
      const currentEnd = selection.endOffset;

      const bookmarkContent = this.getBookmarkContentSilent(bookmarkName);

      if (currentStart !== undefined && currentEnd !== undefined) {
        selection.select(currentStart, currentEnd);
      }

      return bookmarkContent;
    } catch {
      return '';
    }
  }

  private getBookmarkContentSilent(bookmarkName: string): string {
    try {
      const editor = this.Document.editor;
      const selection = this.Document.selection;
      if (!editor || !selection) {
        return '';
      }

      const originalScrollBehavior =
        document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';

      const content = this.getBookmarkContent(bookmarkName);

      document.documentElement.style.scrollBehavior = originalScrollBehavior;

      return content;
    } catch {
      return '';
    }
  }

  checkForBookmarkChanges(clauses: Clause[]): Clause[] {
    if (!clauses || clauses.length === 0) {
      return [];
    }

    const updatedClauses: Clause[] = [];

    for (const clause of clauses) {
      try {
        const richContent = this.getBookmarkContentSilent(clause.bookmarkName);

        if (richContent && richContent !== clause.content) {
          updatedClauses.push({ ...clause, content: richContent });
        } else {
          updatedClauses.push(clause);
        }
      } catch {
        updatedClauses.push(clause);
      }
    }

    return updatedClauses;
  }

  selectClause(clause: Clause): boolean {
    try {
      const editor = this.Document.editor;
      const selection = this.Document.selection;
      if (!editor || !selection) {
        return false;
      }

      selection.selectBookmark(clause.bookmarkName, true);

      setTimeout(() => {
        const editorElement = document.querySelector(
          '.e-documenteditor-container'
        );
        if (editorElement) {
          const selectedText = editorElement.querySelector('.e-selection');
          if (selectedText) {
            selectedText.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }
      }, 100);

      return true;
    } catch {
      return false;
    }
  }
}
