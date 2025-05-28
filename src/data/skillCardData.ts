import { type SkillCardProps } from '../untils/SkillCardProps';

export async function fetchSkillCardData(): Promise<SkillCardProps[]> {
    const url = `${import.meta.env.BASE_URL}data/SkillCardProps.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch skill card data: ${res.status}`);

    return res.json();
}
