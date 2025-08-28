import { USE_API, API_BASE_URL, STATIC_DATA_URL } from "../Config";
import type { ProjectProps, Category } from "../untils/ProjectProps";

export async function fetchCategories(): Promise<Category[]> {
  if (USE_API) {
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
    return res.json() as Promise<Category[]>;
  } else {
    // Fetch from static data and extract categories
    const projects = await fetchProjectsData();
    const allCategories = projects.flatMap(p => p.category);
    const uniqueCategories = Array.from(new Map(allCategories.map(c => [c.short, c])).values());
    return uniqueCategories;
  }
}

export async function fetchProjectsData(
  category: string | null = null,
): Promise<ProjectProps[]> {
  if (USE_API) {
    const params = new URLSearchParams();
    if (category) {
      params.set('cat', category);
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
    return res.json() as Promise<ProjectProps[]>;
  } else {
    const url = `${STATIC_DATA_URL}/ProjectProps.json`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch static projects: ${res.status} ${res.statusText}`);
    }
    let projects = await res.json() as ProjectProps[];
    if (category) {
      projects = projects.filter(p => p.category.map(c => c.short.toLowerCase()).includes(category.toLowerCase()));
    }
    return projects;
  }
}

export async function fetchProjectById(
  id: string,
): Promise<ProjectProps> {
  if (USE_API) {
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
    return res.json() as Promise<ProjectProps>;
  } else {
    const projects = await fetchProjectsData();
    const project = projects.find(p => p.id === id);
    if (!project) {
      throw new Error(`Project with id ${id} not found in static data.`);
    }
    return project;
  }
}
