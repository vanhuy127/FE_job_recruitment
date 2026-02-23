import { lazy } from 'react';

import type { RouteObject } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/router';
import { BlankLayout } from '@/layout/blank';
import { AdminLayout } from '@/layout/admin';

const Unauthorized = lazy(() => import('@/pages/Unauthorized'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));

//Người dùng có thể truy cập mà không cần xác thực
const GlobalRoutes: RouteObject[] = [
  {
    element: <AdminLayout />,
    children: [{ path: ROUTE_PATH.ADMIN.DASHBOARD, element: <Dashboard /> }],
  },
  {
    element: <BlankLayout />,
    children: [
      { path: ROUTE_PATH.UNAUTHORIZE, element: <Unauthorized /> },
      { path: ROUTE_PATH.NOT_FOUND, element: <NotFound /> },
    ],
  },
];

export default GlobalRoutes;
