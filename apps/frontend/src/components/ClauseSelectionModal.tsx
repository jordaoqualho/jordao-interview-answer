import { useState } from 'react';
import { Clause } from '../types/clause';
import { filterClauses } from '../utils/clauseUtils';
import { ClauseCard, SearchInput } from './ClauseComponents';

interface ClauseSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectClause: (clause: Clause) => void;
  insertedClauses: Clause[];
}

export const ClauseSelectionModal = ({
  isOpen,
  onClose,
  onSelectClause,
  insertedClauses,
}: ClauseSelectionModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClauses = filterClauses(searchTerm, insertedClauses);

  const handleSelectClause = (clause: Clause) => {
    onSelectClause(clause);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Select Clause</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ✕
            </button>
          </div>
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredClauses.map((clause) => (
              <ClauseCard
                key={clause.id}
                clause={clause}
                onSelect={handleSelectClause}
              />
            ))}
          </div>

          {filteredClauses.length === 0 && (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No clause found
              </h3>
              <p className="text-gray-500">Try adjusting your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
