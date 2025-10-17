import { deleteTask } from './delete-task';
import { prisma } from '@/lib/prisma';

describe('deleteTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  /*** SUCCESS CASE ***/
  it('deletes a task successfully', async () => {
    const mockDeleted = { count: 1 };
    (prisma.task.deleteMany as jest.Mock).mockResolvedValue(mockDeleted);

    const result = await deleteTask('task1', 'user1');

    expect(prisma.task.deleteMany).toHaveBeenCalledWith({
      where: { id: 'task1', userId: 'user1' },
    });
    expect(result).toEqual(mockDeleted);
  });

  /*** INVALID INPUT ***/
  it('returns null if task ID is empty', async () => {
    const result = await deleteTask('', 'user1');
    expect(result).toBeNull();
    expect(prisma.task.deleteMany).not.toHaveBeenCalled();
  });

  it('returns null if user ID is empty', async () => {
    const result = await deleteTask('task1', '');
    expect(result).toBeNull();
    expect(prisma.task.deleteMany).not.toHaveBeenCalled();
  });

  /*** DELETE FAILS ***/
  it('returns null if no task was deleted', async () => {
    const mockDeleted = { count: 0 };
    (prisma.task.deleteMany as jest.Mock).mockResolvedValue(mockDeleted);

    const result = await deleteTask('task1', 'user1');
    expect(result).toBeNull();
  });

  /*** DATABASE ERROR ***/
  it('returns null in case of database error', async () => {
    (prisma.task.deleteMany as jest.Mock).mockRejectedValue(new Error('Database error'));

    const result = await deleteTask('task1', 'user1');
    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith(new Error('Database error'));
  });
});
