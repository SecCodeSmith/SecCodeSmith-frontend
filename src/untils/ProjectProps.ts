
export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  projectDetails?: ProjectDetails;
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
  startDate?: string;
  endDate?: string;
  dateFormatted?: string;
  role?: string;
  status?: string;
  client?: string;
  keyFeatures?: string[];
  gallery?: string[];
  fullTechStack?: FullTechStack[];
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
