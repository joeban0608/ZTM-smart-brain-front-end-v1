import { render, screen } from '@testing-library/react';

jest.mock('@tsparticles/react', () => ({
  __esModule: true,
  default: () => null,
  initParticlesEngine: jest.fn(() => Promise.resolve())
}));

jest.mock('@tsparticles/slim', () => ({
  loadSlim: jest.fn(() => Promise.resolve())
}));

import App from './App';

test('renders sign in form', () => {
  render(<App />);
  const emailInput = screen.getByLabelText(/email/i);
  expect(emailInput).toBeInTheDocument();
});
