import type { ProjectProps, Category } from "../untils/ProjectProps";

type CategoryMap = Record<string, Category>
export const Categories: CategoryMap = {
  Embedded: {
    fullName: "Embedded Systems",
    shortName: "Embedded",
    icon: "fas fa-microchip",
  },
  Web: {
    fullName: "Web Development",
    shortName: "Web",
    icon: "fas fa-code",
  },
  ML: {
    fullName: "Machine Learning",
    shortName: "ML",
    icon: "fas fa-robot",
  },
  IoT: {
    fullName: "Internet of Things",
    shortName: "IoT",
    icon: "fas fa-network-wired",
  },
  Sec: {
    fullName: "Cybersecurity",
    shortName: "Security",
    icon: "fas fa-shield-alt",
  },
}

export async function fetchProjectsData(): Promise<ProjectProps[]> {
  const url = `${import.meta.env.BASE_URL}data/ProjectProps.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`);



  type RawProject = Omit<ProjectProps, 'category'> & { category: string[] };

  const rawProjects: RawProject[] = await res.json();

  // map the category-keys back to your CategoryMap objects
  return rawProjects.map(p => ({
    ...p,
    category: p.category.map(key => {
      const cat = Categories[key];
      if (!cat) throw new Error(`Unknown project category key: ${key}`);
      return cat;
    })
  }));

}
