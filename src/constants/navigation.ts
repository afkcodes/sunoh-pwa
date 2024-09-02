import { IconType } from 'react-icons';
import { LuLibrary } from 'react-icons/lu';
import { PiRadio } from 'react-icons/pi';
import { RiHome5Line, RiSearch2Line } from 'react-icons/ri';

export interface NavItems {
  id: number;
  path: string;
  title: string;
  name: string;
  icon: IconType;
}

export const navItems: NavItems[] = [
  {
    id: 0,
    path: '/home',
    title: 'Home',
    name: 'home',
    icon: RiHome5Line,
  },
  {
    id: 1,
    path: '/search',
    title: 'Search',
    name: 'search',
    icon: RiSearch2Line,
  },
  // {
  //   id: 2,
  //   path: '/podcast',
  //   title: 'Podcast',
  //   name: 'podcast',
  //   icon: BiPodcast,
  // },
  {
    id: 3,
    path: '/radio',
    title: 'Radio',
    name: 'radio',
    icon: PiRadio,
  },
  {
    id: 4,
    path: '/library',
    title: 'Library',
    name: 'library',
    icon: LuLibrary,
  },
];
