import { Clause } from '../types/clause';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search clauses..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <svg
      className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
);

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="text-center py-8">
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
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
    <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
    <p className="mt-1 text-sm text-gray-500">{description}</p>
  </div>
);

interface ClauseCardProps {
  clause: Clause;
  onSelect: (clause: Clause) => void;
}

export const ClauseCard = ({ clause, onSelect }: ClauseCardProps) => (
  <div
    className="clause-card border border-gray-200 rounded-lg p-4 bg-white hover:border-blue-300 cursor-pointer relative"
    onClick={() => onSelect(clause)}
  >
    <div className="flex items-start justify-between mb-3">
      <h3 className="font-semibold text-gray-800 text-sm leading-tight">
        {clause.title}
      </h3>
      <div className="ml-2 flex-shrink-0">
        <svg
          className="h-5 w-5 text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
      {clause.content}
    </p>
    <div className="mt-3 pt-3 border-t border-gray-100">
      <button
        className="w-full bg-blue-600 text-white text-xs py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(clause);
        }}
      >
        Add to Document
      </button>
    </div>
  </div>
);

interface InsertedClauseCardProps {
  clause: Clause;
  onRemove: (clause: Clause) => void;
  onSelect: (clause: Clause) => void;
  isSelected: boolean;
}

export const InsertedClauseCard = ({
  clause,
  onRemove,
  onSelect,
  isSelected,
}: InsertedClauseCardProps) => (
  <div
    className={`clause-card border rounded-lg p-3 cursor-pointer ${
      isSelected
        ? 'border-blue-500 bg-blue-50 selected'
        : 'border-green-200 bg-green-50 hover:border-green-300'
    }`}
    onClick={() => onSelect(clause)}
  >
    <div className="flex items-center justify-between">
      <h4 className="font-medium text-sm text-gray-800 leading-tight flex-1">
        {clause.title}
      </h4>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(clause);
        }}
        className="ml-2 bg-red-600 text-white text-xs py-1 px-2 rounded hover:bg-red-700 transition-colors font-medium flex items-center justify-center"
        title="Remove clause"
      >
        <svg
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  </div>
);

interface SidebarHeaderProps {
  onClose: () => void;
  onOpenModal: () => void;
}

export const SidebarHeader = ({ onClose, onOpenModal }: SidebarHeaderProps) => (
  <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800">Clause Manager</h2>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 text-xl font-bold"
      >
        ✕
      </button>
    </div>

    <button
      onClick={onOpenModal}
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
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
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <span>Add Clause</span>
    </button>
  </div>
);
