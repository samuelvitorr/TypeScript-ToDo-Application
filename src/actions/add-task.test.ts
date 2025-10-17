import { NewTask } from './add-task';
import { prisma } from '@/lib/prisma';

describe('NewTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  /*** SUCCESS CASE ***/
  it('creates a new task successfully', async () => {
    const mockTask = { id: '1', task: 'Test Task', done: false, userId: 'user1' };
    (prisma.task.create as jest.Mock).mockResolvedValue(mockTask);

    const result = await NewTask('Test Task', 'user1');

    expect(prisma.task.create).toHaveBeenCalledWith({
      data: { task: 'Test Task', done: false, userId: 'user1' },
    });
    expect(result).toEqual(mockTask);
  });

  /*** INVALID INPUT ***/
  it('returns null if task name is empty', async () => {
    const result = await NewTask('', 'user1');
    expect(result).toBeNull();
    expect(prisma.task.create).not.toHaveBeenCalled();
  });

  it('returns null if user ID is empty', async () => {
    const result = await NewTask('Test Task', '');
    expect(result).toBeNull();
    expect(prisma.task.create).not.toHaveBeenCalled();
  });

  /*** DATABASE ERROR ***/
  it('returns null in case of database error', async () => {
    (prisma.task.create as jest.Mock).mockRejectedValue(new Error('Database error'));

    const result = await NewTask('Test Task', 'user1');
    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith(new Error('Database error'));
  });
});
