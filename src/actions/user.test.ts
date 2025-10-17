import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createUserAction, loginUserAction } from './user';

// Mock bcrypt
jest.mock('bcryptjs', () => ({ hash: jest.fn(), compare: jest.fn() }));

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: { user: { findUnique: jest.fn(), create: jest.fn() } },
}));

describe('User Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const makeFormData = (name: string, password: string) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('password', password);
    return formData;
  };

  /*** CREATE USER ***/
  describe('createUserAction', () => {
    it('creates a user successfully', async () => {
      const formData = makeFormData('testuser', 'testpass');

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (prisma.user.create as jest.Mock).mockResolvedValue({ id: 'user123', name: 'testuser', password: 'hashedpassword' });

      const result = await createUserAction(formData);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { name: 'testuser' } });
      expect(bcrypt.hash).toHaveBeenCalledWith('testpass', 10);
      expect(prisma.user.create).toHaveBeenCalledWith({ data: { name: 'testuser', password: 'hashedpassword' } });
      expect(result).toEqual({ success: true, userId: 'user123' });
    });

    it('returns error if name or password is empty', async () => {
      const emptyName = await createUserAction(makeFormData('', 'testpass'));
      const emptyPass = await createUserAction(makeFormData('testuser', ''));

      expect(emptyName).toEqual({ message: 'Nome e senha são obrigatórios.' });
      expect(emptyPass).toEqual({ message: 'Nome e senha são obrigatórios.' });
      expect(prisma.user.findUnique).not.toHaveBeenCalled();
    });

    it('returns error if user already exists', async () => {
      const formData = makeFormData('existinguser', 'testpass');

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 'existing123', name: 'existinguser', password: 'hashedpass' });

      const result = await createUserAction(formData);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { name: 'existinguser' } });
      expect(result).toEqual({ message: 'Usuario ja existe.' });
      expect(prisma.user.create).not.toHaveBeenCalled();
    });

    it('throws error if database creation fails', async () => {
      const formData = makeFormData('testuser', 'testpass');

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (prisma.user.create as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(createUserAction(formData)).rejects.toThrow('Database error');
    });
  });

  /*** LOGIN USER ***/
  describe('loginUserAction', () => {
    it('logs in successfully', async () => {
      const formData = makeFormData('testuser', 'testpass');
      const mockUser = { id: 'user123', name: 'testuser', password: 'hashedpassword' };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await loginUserAction(formData);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { name: 'testuser' } });
      expect(bcrypt.compare).toHaveBeenCalledWith('testpass', mockUser.password);
      expect(result).toEqual({ success: true, userId: 'user123' });
    });

    it('returns error if name or password is empty', async () => {
      const emptyName = await loginUserAction(makeFormData('', 'testpass'));
      const emptyPass = await loginUserAction(makeFormData('testuser', ''));

      expect(emptyName).toEqual({ message: 'Preencha todos os campos.' });
      expect(emptyPass).toEqual({ message: 'Preencha todos os campos.' });
      expect(prisma.user.findUnique).not.toHaveBeenCalled();
    });

    it('returns error if user not found', async () => {
      const formData = makeFormData('nonexistent', 'testpass');
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await loginUserAction(formData);

      expect(result).toEqual({ message: 'Usuario nao encontrado.' });
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it('returns error if password is incorrect', async () => {
      const formData = makeFormData('testuser', 'wrongpass');
      const mockUser = { id: 'user123', name: 'testuser', password: 'hashedpassword' };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await loginUserAction(formData);

      expect(result).toEqual({ message: 'Senha incorreta.' });
    });

    it('throws error if database query fails', async () => {
      const formData = makeFormData('testuser', 'testpass');
      (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(loginUserAction(formData)).rejects.toThrow('Database error');
    });
  });
});
