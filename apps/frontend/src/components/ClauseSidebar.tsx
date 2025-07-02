import { useModalState } from '../hooks/useModalState';
import { Clause } from '../types/clause';
import { EmptyState, SidebarHeader } from './ClauseComponents';
import { ClauseSelectionModal } from './ClauseSelectionModal';
import { clauseSidebarStyles } from './ClauseSidebar.styles';
import { InsertedClausesList } from './InsertedClausesList';

interface ClauseSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  insertedClauses: Clause[];
  onAddClause: (clause: Clause) => void;
  onRemoveClause: (clause: Clause) => void;
  onRemoveAllClauses: () => void;
  onSelectClause: (clause: Clause) => void;
  selectedClauseId: string | null;
}

export const ClauseSidebar = ({
  isOpen,
  onClose,
  insertedClauses,
  onAddClause,
  onRemoveClause,
  onRemoveAllClauses,
  onSelectClause,
  selectedClauseId,
}: ClauseSidebarProps) => {
  const modalState = useModalState();

  return (
    <>
      <style>{clauseSidebarStyles}</style>

      <ClauseSelectionModal
        isOpen={modalState.isOpen}
        onClose={modalState.close}
        onSelectClause={onAddClause}
        insertedClauses={insertedClauses}
      />

      <div
        className={`absolute top-0 left-0 h-full w-80 bg-white shadow-lg transition-all duration-300 z-10 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarHeader onClose={onClose} onOpenModal={modalState.open} />

        <div className="p-4 overflow-y-auto h-full">
          {insertedClauses.length === 0 ? (
            <EmptyState
              title="No clause inserted"
              description="Click 'Add Clause' to start."
            />
          ) : (
            <InsertedClausesList
              insertedClauses={insertedClauses}
              onRemoveClause={onRemoveClause}
              onRemoveAllClauses={onRemoveAllClauses}
              onSelectClause={onSelectClause}
              selectedClauseId={selectedClauseId}
            />
          )}
        </div>
      </div>
    </>
  );
};
