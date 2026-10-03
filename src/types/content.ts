export interface Link {
  label: string;
  href: string;
}
export interface Destination {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  duration: string;
  altitude: string;
  number: string;
}
export interface Feature {
  image: string;
  title: string;
  description: string;
  icon: "shield" | "orbit" | "sparkles";
}
export interface Journey {
  name: string;
  description: string;
  price: string;
  unit: string;
  features: string[];
  featured?: boolean;
}
export interface Question {
  question: string;
  answer: string;
}
