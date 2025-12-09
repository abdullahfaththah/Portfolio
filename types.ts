export interface Project {
  title: string;
  description: string;
  tech: string[];
  details: string[];
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  details: string[];
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ResumeData {
  personalInfo: {
    name: string;
    role: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    instagram?: string;
    facebook?: string;
    snapchat?: string;
    x?: string;
    wechat?: string;
    summary: string;
    image: string;
  };
  education: Education[];
  certifications: string[];
  skills: SkillCategory[];
  projects: Project[];
}

export type ImageSize = '1K' | '2K' | '4K';

export enum AIModelType {
  IMAGE_GEN = 'gemini-3-pro-image-preview',
  VIDEO_GEN = 'veo-3.1-fast-generate-preview',
  IMAGE_EDIT = 'gemini-2.5-flash-image',
}