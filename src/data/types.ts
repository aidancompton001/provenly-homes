// Provenly Homes — Data Type Definitions

export interface SiteConfig {
  company: string;
  owner: string;
  address: string;
  phone: string;
  emailDisplay: string;
  emailCanonical: string;
  social: SocialLinks;
  navigation: NavItem[];
  footer: FooterConfig;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterConfig {
  address: string;
  email: string;
  phone: string;
  copyright: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ServicesData {
  heading: string;
  subheading: string;
  services: Service[];
  closing: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  percentage: number;
  subtitle: string;
  features: string[];
  cta: string;
}

export interface Addon {
  id: string;
  name: string;
}

export interface PricingData {
  heading: string;
  subheading: string;
  startvorteil: {
    heading: string;
    description: string;
  };
  packages: PricingPackage[];
  custom: {
    heading: string;
    description: string;
    cta: string;
    ctaNote: string;
  };
  addons: Addon[];
}

export interface Testimonial {
  id: string;
  profile: string;
  location: string;
  goal: string;
  result: string;
}

export interface TestimonialsData {
  heading: string;
  intro: string;
  testimonials: Testimonial[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface FAQData {
  heading: string;
  intro: string;
  faqs: FAQ[];
}

export interface PropertyDistance {
  label: string;
  time: string;
}

export interface Property {
  slug: string;
  name: string;
  location: string;
  district: string;
  address: string;
  size: string;
  capacity: string;
  bedrooms: number;
  bathrooms: number;
  feature: string;
  pricePerNight: number;
  rating: number;
  reviewCount: string;
  tagline: string;
  amenities: string[];
  highlights: string[];
  distances: PropertyDistance[];
  extras: string[];
}

export interface ArticleFAQ {
  question: string;
  answer?: string;
}

export interface ArticleSection {
  title: string;
  body?: string;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  author: string;
  description: string;
  sections: ArticleSection[];
  faqs: ArticleFAQ[];
  keyQuotes: string[];
}

export interface ContactFormOption {
  label: string;
  value: string;
}

export interface ContactFormField {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "number" | "radio" | "checkbox";
  placeholder?: string;
  suffix?: string;
  options?: ContactFormOption[];
  required?: boolean;
}

export interface ContactFormSection {
  id: string;
  title: string;
  subtitle?: string;
  fields: ContactFormField[];
}

export interface ContactFormData {
  title: string;
  heading: string;
  body: string;
  sections: ContactFormSection[];
  submitLabel: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface ComparisonRow {
  category: string;
  private: string;
  agency: string;
  provenly: string;
}

export interface HeroData {
  heading: string;
  subheading: string;
  ctas: { label: string; href: string }[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface CityDistrict {
  name: string;
  description: string;
}

export interface CityData {
  slug: string;
  name: string;
  h1: string;
  intro: string;
  marketStats: {
    avgNightlyRate: string;
    avgOccupancy: string;
    demandDrivers: string;
  };
  districts: CityDistrict[];
  regulations: {
    heading: string;
    items: string[];
  };
  cta: {
    heading: string;
    text: string;
    buttonLabel: string;
    buttonHref: string;
  };
}

export interface CitiesData {
  cities: CityData[];
}

export interface HomepageData {
  hero: HeroData;
  vision: {
    heading: string;
    body: string;
    subheading: string;
    stats: Stat[];
  };
  system: {
    heading: string;
    body: string;
  };
  comparison: {
    heading: string;
    subheading: string;
    columns: string[];
    rows: ComparisonRow[];
  };
  dashboard: {
    heading: string;
    subheading: string;
    description: string;
  };
  process: {
    heading: string;
    subheading: string;
    steps: ProcessStep[];
  };
}
