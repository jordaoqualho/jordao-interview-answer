export const clauseSidebarStyles = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .clause-card {
    transition: all 0.2s ease-in-out;
  }

  .clause-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .clause-card.selected {
    border-color: #3b82f6;
    background-color: #eff6ff;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  .modal-overlay {
    backdrop-filter: blur(4px);
  }
`;
