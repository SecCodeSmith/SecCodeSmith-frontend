import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Projects } from '../src/pages/Projects';
import * as projectsData from '../src/data/projectsData';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import userEvent from '@testing-library/user-event';

const mockProjects = [
  { id: '1', title: 'Project 1', description: 'Description 1', image: '', category: [{ name: 'Web', short: 'Web', slug: 'web' }], technologies: [], featured: false, github: '', demo: '' },
  { id: '2', title: 'Project 2', description: 'Description 2', image: '', category: [{ name: 'Mobile', short: 'Mobile', slug: 'mobile' }], technologies: [], featured: false, github: '', demo: '' },
];

const mockCategories = [
  { id: '1', name: 'Web', short: 'Web', slug: 'web' },
  { id: '2', name: 'Mobile', short: 'Mobile', slug: 'mobile' },
];

vi.mock('../src/data/projectsData');

describe('Projects Page', () => {
  beforeEach(() => {
    vi.spyOn(projectsData, 'fetchProjectsData').mockResolvedValue(mockProjects);
    vi.spyOn(projectsData, 'fetchCategories').mockResolvedValue(mockCategories);
  });

  it('renders the projects page with projects and categories', async () => {
    render(
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Projects />
        </Suspense>
      </BrowserRouter>
    );

    expect(await screen.findByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
    expect(screen.getAllByText('Web')).toHaveLength(2);
    expect(screen.getAllByText('Mobile')).toHaveLength(2);
  });

  it('filters projects by category', async () => {
    render(
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Projects />
        </Suspense>
      </BrowserRouter>
    );

    const webButton = await screen.findByRole('button', { name: 'Web' });
    await userEvent.click(webButton);
    expect(projectsData.fetchProjectsData).toHaveBeenCalledWith('Web');
  });
});
