export interface ContentItem {
  sortKey: number;
  isActive: boolean;
}
export interface TextItem extends ContentItem {
  text: string;
}
export interface ContentLink extends ContentItem {
  label: string;
  url: string;
}
export interface ContentImage extends ContentItem {
  url: string;
  alt: string;
}
export interface Document extends ContentItem {
  id: string;
}
export interface PageContent extends Document {
  pageTitle: string;
  eyebrow: string;
  headingLines: TextItem[];
  intro: string;
  notice?: string;
  children?: Paragraph[];
  link?: ContentLink;
}
export interface Paragraph extends ContentItem {
  id: string;
  heading: string;
  text: string;
  isNotice: boolean;
}
export interface DetailContent extends PageContent {
  card: ContentItem & {
    label: string;
    description: string;
    category: string;
    status?: string;
    link: ContentLink;
    image?: ContentImage;
  };
  image?: ContentImage;
  backLink: ContentLink;
  children: Paragraph[];
  link: ContentLink;
}
export interface HeaderContent extends Document {
  brand: ContentItem & { label: string; monogram: string; url: string };
  navigation: ContentItem & { label: string; children: ContentLink[] };
}
export interface FooterContent extends Document {
  copyright: string;
  children: ContentLink[];
}
export interface SiteContent extends Document {
  title: string;
  description: string;
  skipLabel: string;
  favicon: ContentImage;
}
export interface HomeContent extends Document {
  pageTitle: string;
}
export interface HeroContent extends Document {
  id: "hero";
  eyebrow: string;
  headingLines: TextItem[];
  intro: string;
  primaryLink: ContentLink;
  secondaryLink: ContentLink;
  status: string;
  orbital: ContentItem & {
    image: ContentImage;
    topLabels: TextItem[];
    bottomLabels: TextItem[];
    children: TextItem[];
  };
}
export interface StripContent extends Document {
  id: "topic-strip";
  children: TextItem[];
}
export interface InterestsContent extends Document {
  id: "interests";
  eyebrow: string;
  headingLines: TextItem[];
  link: ContentLink;
}
export interface NotebookContent extends Document {
  id: "notebook";
  eyebrow: string;
  heading: string;
  intro: string;
  link: ContentLink;
}
export interface AboutContent extends Document {
  id: "about";
  eyebrow: string;
  heading: string;
  text: string;
  link: ContentLink;
}
export type HomeSection =
  | HeroContent
  | StripContent
  | InterestsContent
  | NotebookContent
  | AboutContent;
