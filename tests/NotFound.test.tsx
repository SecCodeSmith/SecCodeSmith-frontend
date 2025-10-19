import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../src/pages/NotFound';
import { BrowserRouter } from 'react-router-dom';

describe('NotFound Page', () => {
  it('renders the not found page with correct content', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('The Artifact Was Not Found')).toBeInTheDocument();
    expect(screen.getByText('Return to the Forge')).toBeInTheDocument();
  });
});
