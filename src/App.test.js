import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sign in form', () => {
  render(<App />);
  const linkElements = screen.getAllByText(/Sign in/i);
  expect(linkElements.length).toEqual(2);
});
