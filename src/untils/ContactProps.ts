export interface ContactProps {
    email: string;
    businessEmail: string;
    socialLinks: SocialLink[];
    questionsAndAnswers: QuestionAndAnswer[];
    MapIframeUrl: string;
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