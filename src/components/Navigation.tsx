import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';

const navs = [
  {
    title: 'News',
    path: '/news',
  },
  {
    title: 'Live',
    path: '/live',
  },
  {
    title: 'Bio',
    path: '/bio',
  },
  {
    title: 'Disco',
    path: '/disco',
  },
  {
    title: 'Video',
    path: '/video',
  },
  {
    title: 'SNS',
    path: '/sns',
  },
];

export function Navigation() {
  return (
    <div className="flex justify-between w-full mb-6">
      {navs.map((nav) => {
        return (
          <Link href={nav.path} key={nav.title}>
            <span className="text-lg">{nav.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
