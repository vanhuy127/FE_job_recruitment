//endpoint api
export const END_POINT = {
  AUTH: {
    ME: '/auth/me',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    LOCK: '/auth/lock-account',
    UNLOCK: '/auth/unlock-account',
  },
  PROVINCE: {
    GET_ALL: '/provinces',
  },
  ADMIN: {
    USER: {
      GET_ALL: '/admin/users',
    },
    COMPANIES: {
      LIST: '/admin/companies',
      DETAILS: (id: string) => `/admin/company/${id}`,
    },
    JOBS: {
      LIST: '/jobs',
      DETAILS: (id: string) => `/admin/job/${id}`,
    },
    SKILL: {
      GET_ALL: '/admin/skills',
      CREATE: '/admin/skill',
      GET_BY_ID: (id: string) => `/admin/skill/${id}`,
      EDIT: (id: string) => `/admin/skill/${id}`,
      DELETE: (id: string) => `/admin/skill/${id}`,
    },
  },
};
