import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from '../src/components/Spinner';

describe('Spinner Component', () => {
  it('renders the spinner with loading text', () => {
    render(<Spinner />);
    expect(screen.getByText('Heating the forge')).toBeInTheDocument();
  });
});
