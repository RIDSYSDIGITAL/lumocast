export interface NavLink {
  label: string;
  href?: string;
  route?: string;
  fragment?: string;
  external?: boolean;
}

export interface DisplayStat {
  value: string;
  label: string;
}

export interface ProductCard {
  name: string;
  tagline: string;
  image: string;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  // href: string;
  publishedOn: string;
}

export interface FooterContact {
  email: string;
  phone: string;
  address: string;
  copyright: string;
}

export interface LegalFact {
  label: string;
  value: string;
}

export interface LegalSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalPageContent {
  title: string;
  label: string;
  intro: string;
  note: string;
  highlights: string[];
  facts: LegalFact[];
  sections: LegalSection[];
}
