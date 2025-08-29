import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkillCard from '../src/components/SkillCard';

describe('SkillCard Component', () => {
  const mockSkill = {
    categoryTitle: 'Test Category',
    categoryIcon: 'fa-solid fa-code',
    skills: [
      { name: 'Test Skill 1', icon: 'fa-solid fa-star' },
      { name: 'Test Skill 2', icon: 'fa-solid fa-heart' },
    ]
  };

  it('renders the skill card with correct content', () => {
    render(<SkillCard categoryTitle={mockSkill.categoryTitle} categoryIcon={mockSkill.categoryIcon} skills={mockSkill.skills} />);

    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('Test Skill 1')).toBeInTheDocument();
    expect(screen.getByText('Test Skill 2')).toBeInTheDocument();
    expect(document.querySelector('.fa-solid.fa-code')).toBeInTheDocument();
    expect(document.querySelector('.fa-solid.fa-star')).toBeInTheDocument();
    expect(document.querySelector('.fa-solid.fa-heart')).toBeInTheDocument();
  });
});
