import GroupsIcon from '@mui/icons-material/Groups';
import RecommendIcon from '@mui/icons-material/Recommend';
import ThreePIcon from '@mui/icons-material/ThreeP';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Home]: {
    component: asyncComponentLoader(() => import('@/pages/Home')),
    path: '/',
    title: 'Page principale',
    icon: HomeIcon,
  },
  [Pages.PageRequetesCitoyennes]: {
    component: asyncComponentLoader(() => import('@/pages/PageRequetesCitoyennes')),
    path: '/RequetesCitoyennes',
    title: 'Requetes Citoyennes',
    icon: GroupsIcon,
  },
  [Pages.PageConsentements]: {
    component: asyncComponentLoader(() => import('@/pages/PageConsentements')),
    path: '/Consentements',
    title: 'Consentements',
    icon: RecommendIcon,
  },
  [Pages.PageDemandesElus]: {
    component: asyncComponentLoader(() => import('@/pages/PageDemandesElus')),
    path: '/DemandesElus',
    title: 'Demandes Elus',
    icon: ThreePIcon,
  },
  [Pages.PageUserProfile]: {
    component: asyncComponentLoader(() => import('@/pages/PageUserProfile')),
    path: '/UserProfile',
    title: 'Profil',
    icon: AccountCircleIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
