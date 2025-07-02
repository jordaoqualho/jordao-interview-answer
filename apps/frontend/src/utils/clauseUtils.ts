import { PREDEFINED_CLAUSES } from '../data/predefinedClauses';
import { Clause } from '../types/clause';

export const filterClauses = (
  searchTerm: string,
  insertedClauses: Clause[]
): Clause[] => {
  return PREDEFINED_CLAUSES.filter((clause) => {
    const isTitleMatch = clause.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isContentMatch = clause.content
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const wasNotInserted = !insertedClauses.some((c) => c.id === clause.id);
    return (isTitleMatch || isContentMatch) && wasNotInserted;
  });
};

export const confirmRemoveAllClauses = (
  insertedClauses: Clause[],
  onRemoveAllClauses: () => void
): void => {
  if (insertedClauses.length === 0) {
    return;
  }

  const confirmed = window.confirm(
    `Are you sure you want to remove all ${insertedClauses.length} inserted clauses? This action cannot be undone.`
  );

  if (confirmed) {
    onRemoveAllClauses();
  }
};
