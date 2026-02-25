import { lazy } from 'react';

import type { RouteObject } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/router';
import { AdminLayout } from '@/layout/admin';
import { BlankLayout } from '@/layout/blank';
import { DefaultLayout } from '@/layout/default';

const Unauthorized = lazy(() => import('@/pages/Unauthorized'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Home = lazy(() => import('@/pages/user/Home'));

const ListJobs = lazy(() => import('@/pages/admin/job/index'));
const JobDetails = lazy(() => import('@/pages/admin/job/Details'));

//Người dùng có thể truy cập mà không cần xác thực
const GlobalRoutes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [{ path: ROUTE_PATH.USER.HOME, element: <Home /> }],
  },
  {
    element: <AdminLayout />,
    children: [
      { path: ROUTE_PATH.ADMIN.JOBS.LIST, element: <ListJobs /> },
      { path: ROUTE_PATH.ADMIN.JOBS.DETAILS.PATH, element: <JobDetails /> },
    ],
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
