import { RouteConfig } from 'react-router-config';

import Popup from '@/containers/popup';

const routes: RouteConfig[] = [
  { path: '/', exact: true, component: Popup }
];

export default routes;
