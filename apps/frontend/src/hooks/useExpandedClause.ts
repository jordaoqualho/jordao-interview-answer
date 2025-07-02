import { useState } from 'react';

export const useExpandedClause = () => {
  const [expandedClause, setExpandedClause] = useState<string | null>(null);

  const toggleExpand = (clauseId: string) => {
    setExpandedClause(expandedClause === clauseId ? null : clauseId);
  };

  const isExpanded = (clauseId: string) => expandedClause === clauseId;

  const collapseAll = () => setExpandedClause(null);

  return {
    expandedClause,
    toggleExpand,
    isExpanded,
    collapseAll,
  };
};
