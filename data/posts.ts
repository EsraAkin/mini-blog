// src/data/posts.ts

export interface Post {
  id: string;
  title: string;
  summary: string;
}

export const posts: Post[] = [
  {
    id: '1',
    title: 'Next.js Nedir?',
    summary: 'Next.js, React tabanlı bir frameworktür. SSR ve SSG desteği sunar.Next.js, React tabanlı bir frameworktür. SSR ve SSG desteği sunar.Next.js, React tabanlı bir frameworktür. SSR ve SSG desteği sunar.',
  },
  {
    id: '2',
    title: 'getStaticProps Nasıl Çalışır?',
    summary: 'Bu fonksiyon build-time’da veri almanıza olanak tanır.',
  },
  {
    id: '3',
    title: 'Dinamik Rotalar',
    summary: 'Next.js ile dinamik URL yapıları oluşturmak oldukça kolaydır.',
  },
];
