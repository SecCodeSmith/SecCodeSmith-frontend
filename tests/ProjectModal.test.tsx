import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectModal } from '../src/components/ProjectModal';
import * as projectsData from '../src/data/projectsData';
import { contextProjectId } from '../src/pages/Projects';
import React from 'react';

const mockProject = {
  id: '1',
  title: 'Test Project',
  description: 'This is a test project description.',
  image: '/path/to/thumbnail.jpg',
  category: [{ name: 'Web', short: 'Web', slug: 'web' }],
  technologies: [{ name: 'React', icon: 'fab fa-react' }],
  featured: false,
  github: 'https://github.com',
  demo: 'https://example.com',
  project_details: {
    descriptions: ['desc 1', 'desc 2'],
    role: 'Test Role',
    client: 'Test Client',
    start_date: '2024-01-01',
    end_date: '2024-02-01',
    date_format: 'YYYY-MM-DD',
    key_features: ['feature 1', 'feature 2'],
    full_tech_stack: [{ name: 'React', icons: 'fab fa-react' }],
    gallery: ['/path/to/image1.jpg']
  }
};

vi.mock('../src/data/projectsData');

describe('ProjectModal Component', () => {
  it('renders loading state initially', async () => {
    vi.spyOn(projectsData, 'fetchProjectById').mockReturnValue(new Promise(() => {})); // Never resolves
    vi.spyOn(React, 'useContext').mockReturnValue('1');

    await act(async () => {
      render(
        <contextProjectId.Provider value="1">
          <ProjectModal />
        </contextProjectId.Provider>
      );
    });


    expect(await screen.findByText('Loading Project Details...')).toBeInTheDocument();
  });

  it('renders the modal with project details when a project is provided', async () => {
    vi.spyOn(projectsData, 'fetchProjectById').mockResolvedValue(mockProject);
    vi.spyOn(React, 'useContext').mockReturnValue('1');

    await act(async () => {
      render(
        <contextProjectId.Provider value="1">
          <ProjectModal />
        </contextProjectId.Provider>
      );
    });

    expect(await screen.findByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('desc 1')).toBeInTheDocument();
    expect(screen.getByText('Test Role')).toBeInTheDocument();
    expect(screen.getByText('Test Client')).toBeInTheDocument();
    expect(screen.getByText('feature 1')).toBeInTheDocument();
  });
});
