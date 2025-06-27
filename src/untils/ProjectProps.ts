
export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  project_details?: ProjectDetails;
  image: string;
  category: Category[];
  featured?: boolean;
  technologies: ProjectTech[];
  github?: string;
  demo?: string;
  documentation?: string;
}

export interface ProjectDetails {
  descriptions?: string[];
  start_date?: string;
  end_date?: string;
  date_format?: string;
  role?: string;
  status?: string;
  client?: string;
  key_features?: string[];
  gallery?: string[];
  full_tech_stack?: FullTechStack[];
}

export interface Category {
  name: string;
  short: string;
  icon: string;
  countOfProjects?: number;
}

export interface ProjectTech {
  name: string;
  icon: string;
}

export interface FullTechStack {
  name: string;
  icons: string;
}
