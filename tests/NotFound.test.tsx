import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../src/pages/NotFound';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

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
    expect(document.querySelector('.not-found-view')).not.toBeNull();
    expect(document.querySelector('.binary-bg')).not.toBeNull();
    expect(document.querySelector('.ember-particles')).not.toBeNull();
  });
});
