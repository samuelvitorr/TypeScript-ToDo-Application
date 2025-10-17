import { updateTaskStatus } from './toggle-done';
import { prisma } from '@/lib/prisma';

describe('updateTaskStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  /*** SUCCESS CASES ***/
  it('marks a task as completed if it was pending', async () => {
    const mockTask = { id: 'task1', task: 'Test Task', done: false, userId: 'user1' };
    const mockUpdated = { count: 1 };

    (prisma.task.findFirst as jest.Mock).mockResolvedValue(mockTask);
    (prisma.task.updateMany as jest.Mock).mockResolvedValue(mockUpdated);

    const result = await updateTaskStatus('task1', 'user1');

    expect(prisma.task.updateMany).toHaveBeenCalledWith({
      where: { id: 'task1', userId: 'user1' },
      data: { done: true },
    });
    expect(result).toEqual(mockUpdated);
  });

  it('marks a task as pending if it was completed', async () => {
    const mockTask = { id: 'task1', task: 'Test Task', done: true, userId: 'user1' };
    const mockUpdated = { count: 1 };

    (prisma.task.findFirst as jest.Mock).mockResolvedValue(mockTask);
    (prisma.task.updateMany as jest.Mock).mockResolvedValue(mockUpdated);

    const result = await updateTaskStatus('task1', 'user1');

    expect(prisma.task.updateMany).toHaveBeenCalledWith({
      where: { id: 'task1', userId: 'user1' },
      data: { done: false },
    });
    expect(result).toEqual(mockUpdated);
  });

  /*** INVALID INPUT ***/
  it('returns null if taskId is empty', async () => {
    const result = await updateTaskStatus('', 'user1');
    expect(result).toBeNull();
    expect(prisma.task.findFirst).not.toHaveBeenCalled();
  });

  it('returns null if userId is empty', async () => {
    const result = await updateTaskStatus('task1', '');
    expect(result).toBeNull();
    expect(prisma.task.findFirst).not.toHaveBeenCalled();
  });

  /*** TASK NOT FOUND ***/
  it('returns null if task does not exist', async () => {
    (prisma.task.findFirst as jest.Mock).mockResolvedValue(null);

    const result = await updateTaskStatus('task1', 'user1');

    expect(result).toBeNull();
    expect(prisma.task.updateMany).not.toHaveBeenCalled();
  });

  /*** UPDATE FAILS ***/
  it('returns null if no task was updated', async () => {
    const mockTask = { id: 'task1', task: 'Test Task', done: false, userId: 'user1' };
    const mockUpdated = { count: 0 };

    (prisma.task.findFirst as jest.Mock).mockResolvedValue(mockTask);
    (prisma.task.updateMany as jest.Mock).mockResolvedValue(mockUpdated);

    const result = await updateTaskStatus('task1', 'user1');
    expect(result).toBeNull();
  });

  /*** DATABASE ERROR ***/
  it('returns null in case of database error', async () => {
    (prisma.task.findFirst as jest.Mock).mockRejectedValue(new Error('Database error'));

    const result = await updateTaskStatus('task1', 'user1');
    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith(new Error('Database error'));
  });
});
