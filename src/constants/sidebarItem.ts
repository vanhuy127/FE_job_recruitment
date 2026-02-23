import { Briefcase, LayoutDashboard } from 'lucide-react';

import { ROUTE_PATH } from './router';

export const adminNavigationItems = [
  {
    title: 'Thống kê',
    url: ROUTE_PATH.ADMIN.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: 'Việc làm',
    url: ROUTE_PATH.ADMIN.JOBS.LIST,
    icon: Briefcase,
  },
];
