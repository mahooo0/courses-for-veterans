export type Locale = "uk" | "en";

export interface TranslationDictionary {
  nav: {
    forWhom: string;
    howItWorks: string;
    courses: string;
  };
  hero: {
    line1: string;
    line2: string;
    startToday: string;
    viewCourses: string;
    bigTitle: string;
    decorativeAlt: string;
  };
  forWhom: {
    title: string;
    subtitle: string;
    cards: { title: string; description: string }[];
  };
  howItWorks: {
    title: string;
    tryNow: string;
    steps: { title: string; description: string }[];
  };
  courses: {
    title: string;
    subtitle: string;
    startToday: string;
  };
  video: {
    title: string;
    watchVideo: string;
    close: string;
  };
  contactForm: {
    title: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    submit: string;
    submitting: string;
  };
  contactDialog: {
    title: string;
    subtitle: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successSubtitle: string;
  };
  faq: {
    titleLine1: string;
    titleLine2: string;
    items: { question: string; answer: string }[];
  };
  footer: {
    address: string;
    socialMediaAlt: string;
  };
}
