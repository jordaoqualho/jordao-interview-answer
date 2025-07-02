import { DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { ClauseService } from '../services/clauseService';
import { DocumentService } from '../services/documentService';
import {
  createContentChangeHandler,
  getDocumentEditor,
} from '../utils/syncfusionTypes';

export const useDocumentEditor = () => {
  const editorRef = useRef<DocumentEditorContainerComponent>(null);
  const [clauseService, setClauseService] = useState<ClauseService | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  const initializeClauseService = useCallback(() => {
    if (editorRef.current && !clauseService) {
      setClauseService(new ClauseService(editorRef.current.documentEditor));
    }
  }, [clauseService]);

  const loadDocument = useCallback(
    async (initializeClauses: (clauses: any[]) => Promise<void>) => {
      if (hasLoaded) return;

      try {
        setIsLoading(true);
        const documentData = await DocumentService.loadDocument();

        if (documentData.clauses && documentData.clauses.length > 0) {
          if (clauseService?.isReady()) {
            await initializeClauses(documentData.clauses);
          }
        }
      } catch (error) {
        console.error('Error loading document:', error);
      } finally {
        setIsLoading(false);
        setHasLoaded(true);
      }
    },
    [hasLoaded, clauseService]
  );

  const saveDocument = useCallback(async (insertedClauses: any[]) => {
    const doc = editorRef.current?.documentEditor;
    if (!doc) {
      return false;
    }

    try {
      const sfdtString = doc.serialize();
      await DocumentService.saveDocument({
        content: JSON.parse(sfdtString),
        clauses: insertedClauses,
        lastModified: new Date(),
      });
      return true;
    } catch (error) {
      return false;
    }
  }, []);

  const setupContentChangeHandler = useCallback(
    (onSave: () => void, onUpdateClauses: () => void) => {
      const ed = getDocumentEditor(editorRef);
      if (ed) {
        ed.contentChange = createContentChangeHandler(() => {
          onSave();
          onUpdateClauses();
        });
      }
    },
    []
  );

  return {
    editorRef,
    clauseService,
    isLoading,
    hasLoaded,
    initializeClauseService,
    loadDocument,
    saveDocument,
    setupContentChangeHandler,
  };
};
