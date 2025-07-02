import { DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';
import { RefObject } from 'react';
import { Clause } from '../types/clause';
import { downloadFile } from '../utils/fileUtils';
import { openDocumentFile, saveDocumentAsBlob } from '../utils/syncfusionTypes';
import { SaveStatusDisplay } from './SaveStatusDisplay';

export const Header = (props: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  insertedClauses: Clause[];
  saveStatus: string;
  fileInputRef: RefObject<HTMLInputElement | null> | null;
  editorRef: React.RefObject<DocumentEditorContainerComponent | null>;
}) => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    insertedClauses,
    saveStatus,
    fileInputRef,
    editorRef,
  } = props;

  const handleOpen = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target.files?.[0];
    if (!fileInput) return;

    openDocumentFile(editorRef, fileInput);
  };

  const handleDownload = async () => {
    const blob = await saveDocumentAsBlob(editorRef, 'Docx');

    if (!blob) {
      return;
    }

    const file = new File([blob], `Document.docx`, {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    downloadFile(file);
  };

  return (
    <div className="px-6 py-4 bg-white shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Clauses</span>
            {insertedClauses.length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                {insertedClauses.length}
              </span>
            )}
          </button>

          <SaveStatusDisplay saveStatus={saveStatus} />
        </div>

        <div className="flex space-x-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium flex items-center space-x-2"
            onClick={() => fileInputRef?.current?.click()}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Open File</span>
          </button>
          <input
            type="file"
            accept=".docx"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleOpen}
          />
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2"
            onClick={handleDownload}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
