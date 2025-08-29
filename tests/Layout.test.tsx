import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../src/components/Layout';
import { Suspense } from 'react';
import { PAGE_TITLE } from '../src/Config';

// Mock the socialLinkData module
vi.mock('../src/data/socialLinkData', () => ({
  fetchSocialLinkData: vi.fn(() => Promise.resolve([
    { id: 1, name: 'GitHub', url: 'https://github.com', icon: 'fab fa-github' },
    { id: 2, name: 'LinkedIn', url: 'https://linkedin.com', icon: 'fab fa-linkedin' },
  ])),
}));

describe('Layout Component', () => {
  it('renders the header, footer, and child content', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Layout /></Suspense>}>
              <Route index element={<div>Child Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      );
    });

    // Check for Header content (assuming it has "SecCodeSmith" text)
    expect(await screen.findByText(PAGE_TITLE)).toBeInTheDocument();

    // Check for child content
    expect(screen.getByText('Child Content')).toBeInTheDocument();

    // Check for Footer content (assuming it has copyright text)
    expect(screen.getByText(/All rights forged in digital fire/i)).toBeInTheDocument();
  });
});
