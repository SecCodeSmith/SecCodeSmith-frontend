import { API_BASE_URL } from "../Config";
import type { ProjectProps, Category } from "../untils/ProjectProps";

export async function fetchCategories(): Promise<Category[]> {
  const url = `${API_BASE_URL}/project-api/cats`;
  const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        mode: 'cors',
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
    }
  const categories = await res.json() as Category[];
  return categories;
}

export async function fetchProjectsData(
  categories: string | null = null,
): Promise<ProjectProps[]> {
  const params = new URLSearchParams();
  if (categories) {
    params.set('categories', categories);
  }
  const url = `${API_BASE_URL}/project-api/projects?${params.toString()}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    mode: 'cors',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch projects: ${res.status} ${res.statusText}`);
  }
  const projects = await res.json() as ProjectProps[];
  return projects;
}

export async function fetchProjectById(
  id: string,
): Promise<ProjectProps> {
  const url = `${API_BASE_URL}/project-api/projects/${id}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    mode: 'cors',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch project by ID: ${res.status} ${res.statusText}`);
  }
  const project = await res.json() as ProjectProps;
  return project;
}
