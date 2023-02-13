import GroupsIcon from '@mui/icons-material/Groups';
import RecommendIcon from '@mui/icons-material/Recommend';
import ThreePIcon from '@mui/icons-material/ThreeP';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Home]: {
    path: '/',
    component: asyncComponentLoader(() => import('@/pages/Home')),
    title: 'Page principale',
    icon: HomeIcon,
  },
  [Pages.PageRequetesCitoyennes]: {
    path: '/requetescitoyennes',
    component: asyncComponentLoader(() => import('@/pages/PageRequetesCitoyennes')),
    title: 'Requetes Citoyennes',
    icon: GroupsIcon,
  },
  [Pages.PageRequeteCitoyenne]: {
    path: '/requetecitoyenne/:id',
    component: asyncComponentLoader(() => import('@/pages/PageRequeteCitoyenne')),
    // title: 'Requête Citoyenne',
    icon: GroupsIcon,
  },
  [Pages.PageConsentements]: {
    path: '/consentements',
    component: asyncComponentLoader(() => import('@/pages/PageConsentements')),
    title: 'Consentements',
    icon: RecommendIcon,
  },
  [Pages.PageConsentement]: {
    path: '/consentement/:id',
    component: asyncComponentLoader(() => import('@/pages/PageConsentement')),
    // title: 'Consentement',
    icon: RecommendIcon,
  },
  [Pages.PageAddConsentement]: {
    path: '/consentementadd/',
    component: asyncComponentLoader(() => import('@/pages/PageAddConsentement')),
    // title: 'Consentement',
    icon: RecommendIcon,
  },
  [Pages.PageConsentement]: {
    path: '/consentement/',
    component: asyncComponentLoader(() => import('@/pages/PageConsentement')),
    // title: 'Consentement',
    icon: RecommendIcon,
  },
  [Pages.PageDemandesElus]: {
    path: '/demandeselus',
    component: asyncComponentLoader(() => import('@/pages/PageDemandesElus')),
    title: 'Demandes Elus',
    icon: ThreePIcon,
  },
  [Pages.PageUserProfile]: {
    path: '/userprofile',
    component: asyncComponentLoader(() => import('@/pages/PageUserProfile')),
    title: 'Profil',
    icon: AccountCircleIcon,
  },
  [Pages.PageSignIn]: {
    path: '/signin',
    component: asyncComponentLoader(() => import('@/pages/PageSignIn')),
    title: 'Connect',
    icon: HttpsIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
