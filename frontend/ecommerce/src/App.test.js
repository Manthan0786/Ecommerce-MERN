import { render, screen } from '@testing-library/react';
import App from './App';

test('renders landing page', () => {
  render(<Product />);
  expect(screen.getByRole("button", { name: "Home" })).toBeDisabled();
});
