import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './filter';
import '@testing-library/jest-dom';

// Simplified mocks
jest.mock('lucide-react', () => ({
  ArrowDownRight: () => <div data-testid="arrow-down-right-icon" />,
  Check: () => <div data-testid="check-icon" />,
  List: () => <div data-testid="list-icon" />,
}));

jest.mock('./ui/badge', () => ({
  Badge: ({ children, onClick, variant, className }: { children: React.ReactNode; onClick: () => void; variant?: string; className?: string }) => (
    <button onClick={onClick} className={className} data-variant={variant}>
      {children}
    </button>
  ),
}));

describe('Filter', () => {
  const mockSetCurrentFilter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all filter options', () => {
    render(<Filter currentFilter="all" setCurrentFilter={mockSetCurrentFilter} />);

    expect(screen.getByText('Todas')).toBeInTheDocument();
    expect(screen.getByText('Não finalizadas')).toBeInTheDocument();
    expect(screen.getByText('Concluídas')).toBeInTheDocument();
  });

  it('calls setCurrentFilter correctly when filters are clicked', () => {
    render(<Filter currentFilter="all" setCurrentFilter={mockSetCurrentFilter} />);

    fireEvent.click(screen.getByText('Todas'));
    expect(mockSetCurrentFilter).toHaveBeenCalledWith('all');

    fireEvent.click(screen.getByText('Não finalizadas'));
    expect(mockSetCurrentFilter).toHaveBeenCalledWith('pending');

    fireEvent.click(screen.getByText('Concluídas'));
    expect(mockSetCurrentFilter).toHaveBeenCalledWith('completed');
  });

  it('updates correctly when the current filter changes', () => {
    const { rerender } = render(<Filter currentFilter="all" setCurrentFilter={mockSetCurrentFilter} />);
    
    // Change filter to "pending"
    rerender(<Filter currentFilter="pending" setCurrentFilter={mockSetCurrentFilter} />);
    
    // Verify "Pending" filter is displayed
    expect(screen.getByText('Não finalizadas')).toBeInTheDocument();
  });
});
