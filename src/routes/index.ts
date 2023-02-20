import GroupsIcon from '@mui/icons-material/Groups';
import RecommendIcon from '@mui/icons-material/Recommend';
import ThreePIcon from '@mui/icons-material/ThreeP';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Home]: {
    path: '/',
    component: asyncComponentLoader(() => import('@/pages/Home')),
    title: 'Page principale',
    icon: HomeIcon,
  },
  [Pages.RequetesCitoyennes]: {
    path: '/requetescitoyennes',
    component: asyncComponentLoader(() => import('@/pages/RequetesCitoyennes')),
    title: 'Requetes Citoyennes',
    icon: GroupsIcon,
  },
  [Pages.RequeteCitoyenne]: {
    path: '/requetecitoyenne/:id',
    component: asyncComponentLoader(() => import('@/pages/RequeteCitoyenne')),
    icon: GroupsIcon,
  },
  [Pages.Consentements]: {
    path: '/consentements',
    component: asyncComponentLoader(() => import('@/pages/Consentements')),
    title: 'Consentements',
    icon: RecommendIcon,
  },
  [Pages.Consentement]: {
    path: '/consentement/:id',
    component: asyncComponentLoader(() => import('@/pages/Consentement')),
    // title: 'Consentement',
    icon: RecommendIcon,
  },
  [Pages.AddConsentement]: {
    path: '/consentementadd/',
    component: asyncComponentLoader(() => import('@/pages/AddConsentement')),
    // title: 'Consentement',
    icon: RecommendIcon,
  },
  [Pages.Consentement]: {
    path: '/consentement/:id',
    component: asyncComponentLoader(() => import('@/pages/Consentement')),
    // title: 'Consentement',
    icon: RecommendIcon,
  },
  [Pages.DemandesElus]: {
    path: '/demandeselus',
    component: asyncComponentLoader(() => import('@/pages/DemandesElus')),
    title: 'Demandes Elus',
    icon: ThreePIcon,
  },
  [Pages.DemandeElu]: {
    path: "/demandeelu",
    component: asyncComponentLoader(() => import('@/pages/DemandeElu')),
    title: 'Créer une demande',
    icon: ContactEmergencyIcon,
  },
  [Pages.DemandeEluEdit]: {
    path: '/demandeelu/:id',
    component: asyncComponentLoader(() => import('@/pages/DemandeElu')),
//  title: 'Modifier une demande',
    icon: ContactEmergencyIcon,
  },
  [Pages.UserProfile]: {
    path: '/userprofile',
    component: asyncComponentLoader(() => import('@/pages/UserProfile')),
    title: 'Profil',
    icon: AccountCircleIcon,
  },
  [Pages.SignIn]: {
    path: '/signin',
    component: asyncComponentLoader(() => import('@/pages/SignIn')),
    title: 'Connect',
    icon: HttpsIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
