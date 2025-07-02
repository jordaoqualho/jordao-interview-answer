import { DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';

export const getDocumentEditor = (
  editorRef: React.RefObject<DocumentEditorContainerComponent | null>
) => {
  return editorRef.current?.documentEditor;
};

export const saveDocumentAsBlob = async (
  editorRef: React.RefObject<DocumentEditorContainerComponent | null>,
  format: 'Docx' | 'Pdf' | 'Sfdt' = 'Docx'
): Promise<Blob | null> => {
  const editor = getDocumentEditor(editorRef);
  if (!editor) {
    return null;
  }
  try {
    return await editor.saveAsBlob(format as 'Docx');
  } catch {
    return null;
  }
};

export const openDocumentFile = (
  editorRef: React.RefObject<DocumentEditorContainerComponent | null>,
  file: File
): boolean => {
  const editor = getDocumentEditor(editorRef);
  if (!editor) {
    return false;
  }

  try {
    editor.open(file);
    return true;
  } catch {
    return false;
  }
};

export const assertSyncfusionComponent = <T>(
  component: any,
  componentName: string
): T => {
  if (!component) {
    throw new Error(`${componentName} component is not available`);
  }
  return component as T;
};

export const createContentChangeHandler = (handler: (e: any) => void) => {
  return (e: any) => {
    try {
      handler(e);
    } catch (error) {
      console.error('Error in content change handler:', error);
    }
  };
};
