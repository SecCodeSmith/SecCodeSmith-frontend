import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Suspense } from 'react';
import App from '../src/App';
import { PAGE_TITLE } from '../src/Config';
import '@testing-library/jest-dom';

const mockSkillCards = [
  {
    categoryTitle: 'Elemental Mastery',
    categoryIcon: 'fa-solid fa-flask',
    skills: [
      { name: 'Alchemy', icon: 'fa-solid fa-vial' },
    ],
  },
];

const mockAboutData = {
  lang: 'en',
  title: 'Forgemaster Lore',
  subtitle: 'Origins of the Artisan',
  image_title: 'At the Forge',
  image: '/images/about.jpg',
  text: 'Shaped by code.\nForged by fire.',
  core_values_title: 'Core Values',
  core_values: [
    { icon: 'fa-solid fa-shield', title: 'Resilience', description: 'Never cracks under pressure.' },
  ],
  technical_arsenal_title: 'Technical Arsenal',
  technical_arsenal: [
    { icon: 'fa-solid fa-code', title: 'Arcane Scripts', skills: ['TypeScript', 'React'] },
  ],
  professional_journal_title: 'Professional Journey',
  professional_journal: [
    { duration: '2021-2024', title: 'Guardian of the Forge', company: 'Order of Code', description: 'Safeguarded digital artifacts.' },
  ],
  testimonials_title: 'Testimonials',
  testimonials: [
    { content: 'An artisan of unmatched caliber.', author: 'Eldrin', position: 'High Loremaster' },
  ],
};

const mockContactData = {
  email: 'forge@example.com',
  business_email: 'alliance@example.com',
  social_links: [
    { platform: 'GitHub', url: 'https://github.com/seccodesmith', icon: 'fab fa-github' },
  ],
  FAQ: [
    { question: 'How do I request an artifact?', answer: 'Send a raven or an email.' },
  ],
  map_iframe_url: 'https://maps.example.com',
  phone: '+1234567890',
};

const mockProjects = [
  {
    id: '1',
    title: 'Shadow Guardian',
    description: 'A sentinel for the digital realm.',
    image: '/images/projects/shadow-guardian.jpg',
    category: [
      { name: 'Web', short: 'WEB', icon: 'fa-solid fa-globe' },
    ],
    featured: false,
    technologies: [
      { name: 'React', icon: 'fa-brands fa-react' },
    ],
    github: 'https://github.com/seccodesmith/shadow-guardian',
    demo: 'https://seccodesmith.dev/shadow-guardian',
  },
];

const mockCategories = [
  { name: 'Web', short: 'WEB', icon: 'fa-solid fa-globe' },
];

const mockProjectDetails = {
  id: '1',
  title: 'Shadow Guardian',
  description: 'A sentinel for the digital realm.',
  image: '/images/projects/shadow-guardian.jpg',
  category: [
    { name: 'Web', short: 'WEB', icon: 'fa-solid fa-globe' },
  ],
  featured: false,
  technologies: [
    { name: 'React', icon: 'fa-brands fa-react' },
  ],
  github: 'https://github.com/seccodesmith/shadow-guardian',
  demo: 'https://seccodesmith.dev/shadow-guardian',
  project_details: {
    descriptions: ['Detailed lore about the guardian.'],
    start_date: '2023-01-01',
    end_date: '2023-02-01',
    date_format: '%Y-%m-%d',
    role: 'Lead Artisan',
    client: 'Digital Keep',
    key_features: ['Adaptive defenses'],
    full_tech_stack: [
      { name: 'TypeScript', icons: 'fa-solid fa-code' },
    ],
  },
};

const mockBlogPost = {
  id: 'post-1',
  slug: 'sample-post',
  title: 'Sample Post',
  excerpt: 'Insights from the forge.',
  image: '/images/blog/sample-post.jpg',
  category: { title: 'Guides', slug: 'guides' },
  publish_at: '2024-01-01',
  author: { name: 'SecCodeSmith', bio: 'Arcane developer', avatar: '/images/authors/forge.jpg' },
  comments: 7,
  read_time: '7 min read',
  featured: false,
  tags: [
    { name: 'React', slug: 'react' },
  ],
  content: '# Chronicle\nForged knowledge awaits.',
};

const mockBlogCategory = { title: 'Guides', slug: 'guides', BlogCount: 1 };
const mockBlogTag = { name: 'React', slug: 'react' };

const mockSocialLinks = [
  { id: 1, name: 'GitHub', url: 'https://github.com/seccodesmith', icon: 'fab fa-github' },
];

const fetchSkillCardDataMock = vi.fn(async () => mockSkillCards);
const fetchAboutPropsMock = vi.fn(async () => mockAboutData);
const fetchContactDataMock = vi.fn(async () => mockContactData);
const fetchProjectsDataMock = vi.fn(async () => mockProjects);
const fetchCategoriesMock = vi.fn(async () => mockCategories);
const fetchProjectByIdMock = vi.fn(async () => mockProjectDetails);
const fetchBlogPostsPageMock = vi.fn(async () => ({ page: 1, posts: [mockBlogPost] }));
const fetchBlogPagesCountMock = vi.fn(async () => 1);
const fetchBlogCategoriesMock = vi.fn(async () => [mockBlogCategory]);
const fetchBlogTagsMock = vi.fn(async () => [mockBlogTag]);
const fetchBlogPostMock = vi.fn(async () => mockBlogPost);
const fetchRelatedPostsByCategoryMock = vi.fn(async () => [mockBlogPost]);
const fetchSocialLinkDataMock = vi.fn(async () => mockSocialLinks);

vi.mock('../src/data/skillCardData', () => ({
  fetchSkillCardData: fetchSkillCardDataMock,
}));

vi.mock('../src/data/AboutProps', () => ({
  fetchAboutProps: fetchAboutPropsMock,
}));

vi.mock('../src/data/contactData', () => ({
  fetchContactData: fetchContactDataMock,
}));

vi.mock('../src/data/projectsData', () => ({
  fetchProjectsData: fetchProjectsDataMock,
  fetchCategories: fetchCategoriesMock,
  fetchProjectById: fetchProjectByIdMock,
}));

vi.mock('../src/data/blogPostsData', () => ({
  fetchBlogPostsPage: fetchBlogPostsPageMock,
  fetchBlogPagesCount: fetchBlogPagesCountMock,
  fetchBlogCategories: fetchBlogCategoriesMock,
  fetchBlogTags: fetchBlogTagsMock,
  fetchBlogPost: fetchBlogPostMock,
  fetchRelatedPostsByCategory: fetchRelatedPostsByCategoryMock,
}));

vi.mock('../src/data/socialLinkData', () => ({
  fetchSocialLinkData: fetchSocialLinkDataMock,
}));

beforeAll(() => {
  vi.stubGlobal('fetch', vi.fn());
  (window as unknown as { scrollTo: () => void }).scrollTo = vi.fn();
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.clearAllTimers();
});

describe('App route integration', () => {
  const cases = [
    {
      path: '/',
      selectors: ['#binary-bg', '.particles', '.skills-section'],
      assert: async () => {
        expect(
          await screen.findByRole('heading', { level: 1, name: PAGE_TITLE })
        ).toBeInTheDocument();
      },
    },
    {
      path: '/about',
      selectors: ['[class*="pageHeader"] .binary-bg', '[class*="timeline"]', '[class*="testimonial"]'],
      assert: async () => {
        expect(await screen.findByText(mockAboutData.title, { exact: false })).toBeInTheDocument();
      },
    },
    {
      path: '/projects',
      selectors: ['[class*="pageHeader"] .binary-bg', '.filter-container', '.filter-button'],
      assert: async () => {
        expect(await screen.findByText('The Digital Forge', { exact: false })).toBeInTheDocument();
      },
    },
    {
      path: '/blog',
      selectors: ['[class*="pageHeader"] .binary-bg', 'form.search-form', '.recent-posts'],
      assert: async () => {
        expect(await screen.findByText('The Arcane Chronicles', { exact: false })).toBeInTheDocument();
      },
    },
    {
      path: '/blog/sample-post',
      selectors: ['[class*="postContainer"]', '[class*="postSidebar"]', '[class*="relatedPostsList"]'],
      assert: async () => {
        expect(
          await screen.findByRole('heading', { level: 1, name: mockBlogPost.title })
        ).toBeInTheDocument();
      },
    },
    {
      path: '/contact',
      selectors: ['[class*="pageHeader"] .binary-bg', '.contact-content', '[class*="socialGrid"]'],
      assert: async () => {
        expect(await screen.findByText('Forge Connection', { exact: false })).toBeInTheDocument();
      },
    },
    {
      path: '/unknown',
      selectors: ['.binary-bg', '.ember-particles', '.home-button'],
      assert: async () => {
        expect(await screen.findByText('The Artifact Was Not Found', { exact: false })).toBeInTheDocument();
      },
    },
  ];

  it.each(cases)('renders %s view', async ({ path, assert, selectors }) => {
    window.history.pushState({}, '', path);

    render(
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    );

    await assert();

    selectors?.forEach((selector) => {
      expect(document.querySelector(selector)).not.toBeNull();
    });
  });
});
