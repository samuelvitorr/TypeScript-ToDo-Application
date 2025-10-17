import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import TaskPage from './page';
import '@testing-library/jest-dom';
import { getTasks } from '@/actions/get-tasks-from-bd';
import { NewTask } from '@/actions/add-task';
import { deleteTask } from '@/actions/delete-task';
import { updateTaskStatus } from '@/actions/toggle-done';
import { toast } from 'sonner';

// Mock Next.js router
const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: mockReplace }),
}));

// Mock localStorage
const mockLocalStorage = { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn() };
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// Mock actions
jest.mock('@/actions/get-tasks-from-bd');
jest.mock('@/actions/add-task');
jest.mock('@/actions/delete-task');
jest.mock('@/actions/toggle-done');
jest.mock('@/actions/clear-completed-tasks');

// Mock toast
jest.mock('sonner', () => ({
  toast: { success: jest.fn(), error: jest.fn(), warning: jest.fn() },
}));

describe('TaskPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Simulate logged-in user
    mockLocalStorage.getItem.mockImplementation((key) => (key === 'loggedIn' ? 'true' : 'user123'));
  });

  it('renders the task page when user is logged in', async () => {
    (getTasks as jest.Mock).mockResolvedValue([{ id: '1', task: 'Test task', done: false, userId: 'user123' }]);

    await act(async () => {
      render(<TaskPage />);
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Adicionar tarefa')).toBeInTheDocument();
    });
    expect(screen.getByText('Cadastrar')).toBeInTheDocument();
  });

  it('redirects to login if user is not logged in', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    await act(async () => {
      render(<TaskPage />);
    });
    expect(mockReplace).toHaveBeenCalledWith('/');
  });

  it('adds a new task successfully', async () => {
    (getTasks as jest.Mock).mockResolvedValue([]);
    (NewTask as jest.Mock).mockResolvedValue({ id: '1', task: 'New task', done: false });

    await act(async () => {
      render(<TaskPage />);
    });
    const input = await screen.findByPlaceholderText('Adicionar tarefa');
    const button = screen.getByText('Cadastrar');

    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(NewTask).toHaveBeenCalledWith('New task', 'user123');
      expect(toast.success).toHaveBeenCalledWith('Atividade adicionada com sucesso');
    });
  });

  it('shows error when adding empty task', async () => {
    (getTasks as jest.Mock).mockResolvedValue([]);

    await act(async () => {
      render(<TaskPage />);
    });
    const button = await screen.findByText('Cadastrar');
    fireEvent.click(button);

    expect(toast.error).toHaveBeenCalledWith('Insira uma atividade');
  });

  it('toggles task status', async () => {
    const mockTask = { id: '1', task: 'Test task', done: false, userId: 'user123' };
    (getTasks as jest.Mock).mockResolvedValue([mockTask]);
    (updateTaskStatus as jest.Mock).mockResolvedValue({ count: 1 });

    await act(async () => {
      render(<TaskPage />);
    });
    const taskText = await screen.findByText('Test task');
    fireEvent.click(taskText);

    await waitFor(() => {
      expect(updateTaskStatus).toHaveBeenCalledWith('1', 'user123');
    });
  });

  it('deletes a task', async () => {
    const mockTask = { id: '1', task: 'Test task', done: false, userId: 'user123' };
    (getTasks as jest.Mock).mockResolvedValue([mockTask]);
    (deleteTask as jest.Mock).mockResolvedValue({ count: 1 });

    await act(async () => {
      render(<TaskPage />);
    });
    const deleteButton = await screen.findByTestId('delete-task-1');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteTask).toHaveBeenCalledWith('1', 'user123');
      expect(toast.warning).toHaveBeenCalledWith('Atividade deletada com sucesso');
    });
  });

  it('filters tasks by status', async () => {
    const tasks = [
      { id: '1', task: 'Task 1', done: false, userId: 'user123' },
      { id: '2', task: 'Task 2', done: true, userId: 'user123' },
    ];
    (getTasks as jest.Mock).mockResolvedValue(tasks);

    await act(async () => {
      render(<TaskPage />);
    });
    await screen.findByText('Task 1');
    await screen.findByText('Task 2');

    fireEvent.click(screen.getByText('Não finalizadas'));
    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
    });
  });

  it('logs out correctly', async () => {
    (getTasks as jest.Mock).mockResolvedValue([]);

    await act(async () => {
      render(<TaskPage />);
    });
    const logoutButton = await screen.findByText('Sair');
    fireEvent.click(logoutButton);

    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('loggedIn');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('userId');
    expect(mockReplace).toHaveBeenCalledWith('/');
  });
});
