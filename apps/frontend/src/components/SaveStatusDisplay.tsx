interface SaveStatusDisplayProps {
  saveStatus: string;
}

export const SaveStatusDisplay = (props: SaveStatusDisplayProps) => {
  const { saveStatus } = props;

  if (saveStatus === 'saved') {
    return (
      <div className="flex items-center space-x-2 text-green-600">
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
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="text-sm font-medium">Saved</span>
      </div>
    );
  }

  if (saveStatus === 'saving') {
    return (
      <div className="flex items-center space-x-2 text-blue-600">
        <svg
          className="animate-spin h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h-.582m0 0a8.001 8.001 0 00-15.356 2m15.356-2H15"
          />
        </svg>
        <span className="text-sm font-medium">Saving...</span>
      </div>
    );
  }
};
