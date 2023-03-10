import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

import type { SvgIconProps } from '@mui/material/SvgIcon';

enum Pages {
  Home,
  RequetesCitoyennes,
  RequeteCitoyenne,  
  Consentements,
  AddConsentement,  
  Consentement,    
  DemandesElus,
  DemandeElu,
  DemandeEluEdit,
  DemandeEluIss,
  DemandeEluIssEdit,
  UserProfile,
  SignIn,
  SignOut,
  NotFound,
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: FC<SvgIconProps>;
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

export type { Routes };
export { Pages };
