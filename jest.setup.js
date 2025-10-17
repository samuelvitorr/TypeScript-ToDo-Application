import '@testing-library/jest-dom';

// Mock do Prisma
const mockPrisma = {
  task: {
    create: jest.fn(),
    deleteMany: jest.fn(),
    updateMany: jest.fn(),
    findFirst: jest.fn(),
  },
};

jest.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}));
