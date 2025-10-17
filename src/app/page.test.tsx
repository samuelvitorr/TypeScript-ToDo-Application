import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './page';
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

describe('LoginPage', () => {
  it('renders the login form by default', () => {
    render(<LoginPage />);

    // Verify that the login heading is visible
    const heading = screen.getByRole('heading', { name: /login/i });
    expect(heading).toBeInTheDocument();
  });

  it('switches to the register form when the "Register" button is clicked', () => {
    render(<LoginPage />);

    // Click the register button
    const registerButton = screen.getByRole('button', {
      name: /Nao tem uma conta\? Cadastre-se/i,
    });
    fireEvent.click(registerButton);

    // Verify that the register heading is visible
    const heading = screen.getByRole('heading', { name: /Crie sua conta/i });
    expect(heading).toBeInTheDocument();
  });
});
