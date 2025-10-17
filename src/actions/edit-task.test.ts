import { editTask } from './edit-task';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    task: {
      update: jest.fn(),
      updateMany: jest.fn(),
    },
  },
}));

describe('editTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('updates a task successfully', async () => {
    const mockTask = { id: 'task1', task: 'Updated Task' };
    (prisma.task.update as jest.Mock).mockResolvedValue(mockTask);

    const result = await editTask('task1', 'Updated Task');

    expect(prisma.task.update).toHaveBeenCalledWith({
      where: { id: 'task1' },
      data: { task: 'Updated Task' },
    });
    expect(result).toEqual(mockTask);
  });

  it('returns null if prisma throws', async () => {
    (prisma.task.update as jest.Mock).mockRejectedValue(new Error('Fail'));

    const result = await editTask('task1', 'Updated Task');

    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith(new Error('Fail'));
  });
});
