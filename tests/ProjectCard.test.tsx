import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectCard } from '../src/components/ProjectCard';
import { BrowserRouter } from 'react-router-dom';

describe('ProjectCard Component', () => {
  const mockProject = {
    id: '1',
    title: 'Test Project',
    description: 'This is a test project description.',
    image: '/path/to/thumbnail.jpg',
    category: [{ name: 'Web', short: 'Web', slug: 'web' }],
    technologies: [{ name: 'React', icon: 'fab fa-react' }],
    featured: false,
    github: 'https://github.com',
    demo: 'https://example.com'
  };

  it('renders the project card with correct content', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} onOpenDetails={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('This is a test project description.')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Web')).toBeInTheDocument();
  });

  it('calls onOpenDetails when the details button is clicked', async () => {
    const onOpenDetailsMock = vi.fn();
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} onOpenDetails={onOpenDetailsMock} />
      </BrowserRouter>
    );

    await userEvent.click(screen.getByText('Project Details'));
    expect(onOpenDetailsMock).toHaveBeenCalledWith('1');
  });
});
