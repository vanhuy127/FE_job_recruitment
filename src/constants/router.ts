//router link
export const ROUTE_PATH = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    JOBS: {
      LIST: '/admin/job',
      DETAILS: {
        PATH: '/admin/job/:id',
        LINK: (id: string) => `/admin/job/${id}`,
      },
    },
  },
  USER: {
    HOME: '/',
  },
  NOT_FOUND: '*',
  UNAUTHORIZE: '/unauthorized',
};
