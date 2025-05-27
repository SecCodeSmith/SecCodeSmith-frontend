export interface AboutProps {
  coreValues: CoreValue[];
  technicalArsenal: TechnicalArsenal[];
  professionalJourney: ProfessionalJourney[];
  testimonials: Testimonial[];
}

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export interface ProfessionalJourney {
  title: string;
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