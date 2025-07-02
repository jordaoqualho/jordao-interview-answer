import { registerLicense } from '@syncfusion/ej2-base';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import {
  DocumentEditorContainerComponent,
  Toolbar,
} from '@syncfusion/ej2-react-documenteditor';
import '@syncfusion/ej2-react-documenteditor/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { ClauseSidebar } from '../components/ClauseSidebar';
import { EditorStyles } from '../components/EditorStyles';
import { Header } from '../components/Header';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { EDITOR_TOOLBAR_ITEMS } from '../constants/editor';
import { useClauseManager } from '../hooks/useClauseManager';
import { useDocumentEditor } from '../hooks/useDocumentEditor';
import { useSaveStatus } from '../hooks/useSaveStatus';
import { Clause } from '../services/documentService';

DocumentEditorContainerComponent.Inject(Toolbar);
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhNYVJ2WmFZfVtgdV9DZVZUTGYuP1ZhSxWdkZiWH9fdXJVR2BaWEE='
);

export const DocumentEditor = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedClauseId, setSelectedClauseId] = useState<string | null>(null);

  const {
    editorRef,
    clauseService,
    isLoading,
    hasLoaded,
    initializeClauseService,
    loadDocument,
    saveDocument,
    setupContentChangeHandler,
  } = useDocumentEditor();

  const { saveStatus, setSaving, setSaved } = useSaveStatus();

  const {
    insertedClauses,
    addClause,
    removeClause,
    removeAllClauses,
    initializeClauses,
    updateClauseContents,
  } = useClauseManager({
    clauseService,
    onClausesChange: () => {
      debouncedSave();
    },
  });

  const debouncedUpdateClauseContents = useDebouncedCallback(
    updateClauseContents,
    1000
  );

  const handleRemoveClause = (clause: Clause) => {
    removeClause(clause.id);
  };

  const handleSelectClause = (clause: Clause) => {
    if (clauseService) {
      clauseService.selectClause(clause);
      setSelectedClauseId(clause.id);
    }
  };

  const handleSave = async () => {
    setSaving();
    const success = await saveDocument(insertedClauses);
    if (success) {
      setSaved();
    }
  };

  const debouncedSave = useDebouncedCallback(handleSave, 1500);

  useEffect(() => {
    initializeClauseService();
  }, [initializeClauseService]);

  useEffect(() => {
    if (clauseService && !hasLoaded) {
      loadDocument(initializeClauses);
    }
  }, [clauseService, hasLoaded, loadDocument, initializeClauses]);

  useEffect(() => {
    setupContentChangeHandler(debouncedSave, debouncedUpdateClauseContents);
  }, [setupContentChangeHandler, debouncedSave, debouncedUpdateClauseContents]);

  useEffect(() => {
    if (editorRef.current?.documentEditor) {
      setupContentChangeHandler(debouncedSave, debouncedUpdateClauseContents);
    }
  }, [
    editorRef.current?.documentEditor,
    setupContentChangeHandler,
    debouncedSave,
    debouncedUpdateClauseContents,
  ]);

  return (
    <div className="relative h-screen bg-gray-300">
      {isLoading && <LoadingOverlay />}

      <ClauseSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        insertedClauses={insertedClauses}
        onAddClause={addClause}
        onRemoveClause={handleRemoveClause}
        onRemoveAllClauses={removeAllClauses}
        onSelectClause={handleSelectClause}
        selectedClauseId={selectedClauseId}
      />

      <div className="h-full flex flex-col">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          insertedClauses={insertedClauses}
          saveStatus={saveStatus}
          fileInputRef={fileInputRef}
          editorRef={editorRef}
        />
        <div className="flex-1 px-6 pb-6">
          <EditorStyles />
          <DocumentEditorContainerComponent
            height="100%"
            serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
            enableToolbar={true}
            showPropertiesPane={false}
            ref={editorRef}
            toolbarItems={EDITOR_TOOLBAR_ITEMS as any}
            contentChange={debouncedSave}
          />
        </div>
      </div>
    </div>
  );
};
