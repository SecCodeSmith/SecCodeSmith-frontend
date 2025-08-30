import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from '../src/pages/About';
import * as aboutData from '../src/data/AboutProps';
import * as contactData from '../src/data/contactData';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

const mockAboutData = {
  lang: 'en',
  title: 'About Me',
  subtitle: 'My story',
  image_title: 'My Picture',
  image: '/path/to/image.jpg',
  text: 'This is **bold** and ***accented*** text.',
  core_values_title: 'Core Values',
  core_values: [{ icon: 'fa-solid fa-star', title: 'Value 1', description: 'Description 1' }],
  technical_arsenal_title: 'Technical Arsenal',
  technical_arsenal: [{ icon: 'fa-solid fa-code', title: 'Arsenal 1', skills: ['Skill 1'] }],
  professional_journal_title: 'Professional Journey',
  professional_journal: [{ duration: '2020-2024', title: 'Job 1', company: 'Company 1', description: 'Description 1' }],
  testimonials_title: 'Testimonials',
  testimonials: [{ content: 'Testimonial 1', author: 'Author 1', position: 'Position 1' }]
};

const mockContactData = {
  email: 'test@example.com',
  business_email: 'business@example.com',
  FAQ: [],
  map_iframe_url: 'https://maps.example.com/embed',
  phone: '+1234567890',
  social_links: [{ platform: 'GitHub', url: 'https://github.com', icon: 'fab fa-github' }]
};

vi.mock('../src/data/AboutProps');
vi.mock('../src/data/contactData');

describe('About Page', () => {
  it('renders the about page with correct content', async () => {
    vi.spyOn(aboutData, 'fetchAboutProps').mockResolvedValue(mockAboutData);
    vi.spyOn(contactData, 'fetchContactData').mockResolvedValue(mockContactData);

    render(
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <About />
        </Suspense>
      </BrowserRouter>
    );

    expect(await screen.findByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('My story')).toBeInTheDocument();
    expect(screen.getByText('My Picture')).toBeInTheDocument();
    expect(screen.getByText('bold')).toBeInTheDocument();
    expect(screen.getByText('accented')).toBeInTheDocument();
    expect(screen.getByText('Core Values')).toBeInTheDocument();
    expect(screen.getByText('Value 1')).toBeInTheDocument();
    expect(screen.getByText('Technical Arsenal')).toBeInTheDocument();
    expect(screen.getByText('Arsenal 1')).toBeInTheDocument();
    expect(screen.getByText('Professional Journey')).toBeInTheDocument();
    expect(screen.getByText('Job 1')).toBeInTheDocument();
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('Testimonial 1')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });
});
