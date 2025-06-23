export interface AboutProps {
  title: string;
  subtitle: string;
  text: string;
  lang: string;
  core_values: CoreValue[];
  technical_arsenal: TechnicalArsenal[];
  professional_journal: ProfessionalJourney[];
  testimonials: Testimonial[];
}

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export interface ProfessionalJourney {
  title: string;
  company: string;
  description: string;
  duration: string;
}

export interface TechnicalArsenal {
  title: string;
  icon: string;
  skills: string[];
}

export interface Testimonial {
  content: string;
  author: string;
  position: string;
}