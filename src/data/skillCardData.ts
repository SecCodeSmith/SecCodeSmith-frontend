import { type SkillCardProps } from '../untils/SkillCardProps';

// Use a relative path to avoid CORS issues and let your front-end framework proxy requests
export async function fetchSkillCardData(): Promise<SkillCardProps[]> {
  const url = 'http://127.0.0.1:8000/api/skills-cards';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch skill card data: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as SkillCardProps[];
  return data;
}
