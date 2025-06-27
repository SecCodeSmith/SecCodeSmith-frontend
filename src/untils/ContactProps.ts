export interface ContactProps {
    email: string;
    business_email: string;
    social_links: SocialLink[];
    FAQ: QuestionAndAnswer[];
    map_iframe_url: string;
    phone: string;
}

export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
}

export interface QuestionAndAnswer {
    question: string;
    answer: string;
}