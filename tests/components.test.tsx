import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';
import { PageHeader } from '../src/components/PageHeader';

// Setup wrapper for components that use router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('Header Component', () => {
  beforeEach(() => {
    renderWithRouter(<Header />);
  });

  it('renders the logo text', () => {
    expect(screen.getByText('SecCodeSmith')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('renders social links', () => {
    const socialLinks = document.querySelectorAll('.social-icon');
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it('renders copyright text with current year', () => {
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} SecCodeSmith. All rights forged in digital fire.`)).toBeInTheDocument();
  });
});

describe('PageHeader Component', () => {
  it('renders with title and subtitle', () => {
    render(
      <PageHeader 
        title="Test Title" 
        subtitle="Test Subtitle" 
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders with only title when no subtitle is provided', () => {
    render(<PageHeader title="Only Title" />);

    expect(screen.getByText('Only Title')).toBeInTheDocument();
    expect(screen.queryByText('Test Subtitle')).not.toBeInTheDocument();
  });
});