import { useState } from 'react';

export const useSaveStatus = () => {
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved'>('saved');

  const setSaving = () => setSaveStatus('saving');
  const setSaved = () => setSaveStatus('saved');

  return {
    saveStatus,
    setSaving,
    setSaved,
  };
};
