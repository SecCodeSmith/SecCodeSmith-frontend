export interface Skill {
    name: string;
    icon: React.ReactNode; // Or string if using CSS classes for icons
}

export interface SkillCardProps {
    categoryTitle: string;
    categoryIcon: React.ReactNode; // Or string
    skills: Skill[];
}