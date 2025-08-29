import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Home } from '../src/pages/Home';
import * as skillCardData from '../src/data/skillCardData';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

const mockSkillCardData = [
  {
    categoryTitle: 'Test Category',
    categoryIcon: 'fa-solid fa-code',
    skills: [
      { name: 'Test Skill 1', icon: 'fa-solid fa-star' },
      { name: 'Test Skill 2', icon: 'fa-solid fa-heart' },
    ]
  }
];

vi.mock('../src/data/skillCardData');

describe('Home Page', () => {
  beforeEach(() => {
    vi.spyOn(skillCardData, 'fetchSkillCardData').mockResolvedValue(mockSkillCardData);
  });

  it('renders the home page with skills', async () => {
    render(
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>
      </BrowserRouter>
    );

    expect(await screen.findByText('SecCodeSmith')).toBeInTheDocument();
    expect(screen.getByText('Forging Digital Solutions in the Fires of Innovation')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('Test Skill 1')).toBeInTheDocument();
  });
});
