import { useCallback, useEffect, useState } from 'react';
import { ClauseService } from '../services/clauseService';
import { Clause } from '../services/documentService';

interface UseClauseManagerProps {
  clauseService: ClauseService | null;
  onClausesChange?: (clauses: Clause[]) => void;
}

export const useClauseManager = ({
  clauseService,
  onClausesChange,
}: UseClauseManagerProps) => {
  const [insertedClauses, setInsertedClauses] = useState<Clause[]>([]);

  const initializeClauses = useCallback(
    async (clauses: Clause[]) => {
      if (!clauseService) {
        return;
      }

      setInsertedClauses([]);

      for (const clause of clauses) {
        const success = await clauseService.insertClause(clause);
        if (success) {
          setInsertedClauses((prev) => [...prev, clause]);
        }
      }

      onClausesChange?.(clauses);
    },
    [clauseService, onClausesChange]
  );

  const addClause = useCallback(
    async (clause: Clause) => {
      if (!clauseService) {
        return;
      }

      const success = await clauseService.insertClause(clause);
      if (success) {
        setInsertedClauses((prev) => {
          const newClauses = [...prev, clause];
          onClausesChange?.(newClauses);
          return newClauses;
        });
      }
    },
    [clauseService, onClausesChange]
  );

  const removeClause = useCallback(
    async (clauseId: string) => {
      if (!clauseService) {
        return;
      }

      const clause = insertedClauses.find((c) => c.id === clauseId);

      if (!clause) {
        return;
      }

      const success = await clauseService.removeClause(clause);
      if (success) {
        setInsertedClauses((prev) => {
          const newClauses = prev.filter((c) => c.id !== clauseId);
          onClausesChange?.(newClauses);
          return newClauses;
        });
      }
    },
    [clauseService, insertedClauses, onClausesChange]
  );

  const removeAllClauses = useCallback(async () => {
    if (!clauseService) {
      return;
    }
    clauseService.removeAllClauses(insertedClauses);
    setInsertedClauses([]);
    onClausesChange?.([]);
  }, [clauseService, insertedClauses, onClausesChange]);

  const updateClauseContents = useCallback(() => {
    if (!clauseService) {
      return;
    }

    const updatedClauses =
      clauseService.checkForBookmarkChanges(insertedClauses);
    setInsertedClauses(updatedClauses);
    onClausesChange?.(updatedClauses);
  }, [clauseService, insertedClauses, onClausesChange]);

  return {
    insertedClauses,
    addClause,
    removeClause,
    removeAllClauses,
    initializeClauses,
    updateClauseContents,
  };
};
