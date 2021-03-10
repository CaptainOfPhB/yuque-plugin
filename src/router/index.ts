import { RouteConfig } from 'react-router-config';

import Popup from '@/containers/popup';
import Setting from '@/containers/setting';

const routes: RouteConfig[] = [
  {
    path: '/setting',
    component: Setting
  },
  {
    path: '/',
    component: Popup
  }
];

export default routes;
