import { IconType } from 'react-icons';
import { LuLibrary } from 'react-icons/lu';
import { RiHome5Line, RiSearch2Line } from 'react-icons/ri';

export interface NavItems {
  id: number;
  path: string;
  title: string;
  icon: IconType;
}

export const navItems: NavItems[] = [
  {
    id: 0,
    path: '/home',
    title: 'Home',
    icon: RiHome5Line,
  },
  {
    id: 1,
    path: '/search',
    title: 'Search',
    icon: RiSearch2Line,
  },
  {
    id: 2,
    path: '/library',
    title: 'Library',
    icon: LuLibrary,
  },
];
