import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Contact } from '../src/pages/Contact';
import * as contactData from '../src/data/contactData';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

const mockContactData = {
  email: 'test@example.com',
  business_email: 'business@example.com',
  social_links: [{ platform: 'GitHub', url: 'https://github.com', icon: 'fab fa-github' }],
  FAQ: [{ question: 'Q1', answer: 'A1' }]
};

vi.mock('../src/data/contactData');

describe('Contact Page', () => {
  beforeEach(() => {
    vi.spyOn(contactData, 'fetchContactData').mockResolvedValue(mockContactData);
  });

  it('renders the contact page with contact info and FAQ', async () => {
    render(
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Contact />
        </Suspense>
      </BrowserRouter>
    );

    expect(await screen.findByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('business@example.com')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Q1')).toBeInTheDocument();
  });
});
