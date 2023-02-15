import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

import type { SvgIconProps } from '@mui/material/SvgIcon';

enum Pages {
  Home,
  PageRequetesCitoyennes,
  PageRequeteCitoyenne,  
  PageConsentements,
  PageAddConsentement,  
  PageConsentement,    
  PageDemandesElus,
  PageDemandeEluAdd,  
  PageUserProfile,
  PageSignIn,
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
