import { type SkillCardProps } from '../untils/SkillCardProps';
import { USE_API, API_BASE_URL, STATIC_DATA_URL } from '../Config';

export async function fetchSkillCardData(): Promise<SkillCardProps[]> {
  if (USE_API) {
    const url = `${API_BASE_URL}/api/skills-cards`;

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

    return (await response.json()) as SkillCardProps[];
  } else {
    const url = `${STATIC_DATA_URL}/SkillCardProps.json`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch static skill card data: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<SkillCardProps[]>;
  }
}
