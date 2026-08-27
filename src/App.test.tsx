import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-player', () => () => null);

test('renders the song search form', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /song search/i })
  ).toBeInTheDocument();
});
