import isMobile from '@/utils/is-mobile';

import type { Notifications } from './types';

const title = 'Portail Élu';

const email = 'octaconcepts.e.dela@laval.ca';

const messages = {
  app: {
    crash: {
      title: 'Désolé, une erreur est survenue. Vous pouvez:',
      options: {
        email: `Contacter le développeur avec ce courriel - ${email}`,
        reset: 'Cliquer ici pour redémarrer',
      },
    },
  },
  loader: {
    fail: 'Hmmmmm, there is something wrong with this component loading process... Maybe trying later would be the best idea',
  },
  images: {
    failed: 'something went wrong during image loading :(',
  },
  404: 'Page inexistante...',
};

const dateFormat = 'MMMM DD, YYYY';

const notifications: Notifications = {
  options: {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    autoHideDuration: 6000,
  },
  maxSnack: isMobile ? 3 : 4,
};

const loader = {
  // no more blinking in your app
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

const defaultMetaTags = {
  image: '/cover.png',
  description: 'Starter kit for modern web applications',
};
const giphy404 = 'https://giphy.com/embed/xTiN0L7EW5trfOvEk0';

export {
  loader,
  notifications,
  dateFormat,
  messages,
  email,
  title,
  defaultMetaTags,
  giphy404,
};
