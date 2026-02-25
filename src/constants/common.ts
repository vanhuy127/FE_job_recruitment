export const LOCAL_STORAGE_KEY = {
  LANGUAGE: 'language',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  THEME: 'theme',
};

export const SYSTEM_ERROR = {
  SERVER_ERROR: {
    STATUS: 'Server Error',
    MESSAGE: 'Unable to connect to the server. Please try again later.',
  },

  NETWORK_ERROR: {
    STATUS: 'Network Error',
    MESSAGE: 'Request has been cancelled',
  },

  TIMEOUT_ERROR: {
    STATUS: 'Request Timeout',
    MESSAGE: 'The request has timed out',
  },
};

export const MAX_PAGE_SIZE = 10000000;
export const MAX_PAGE_SHOW = 7;
export const DEFAULT_TIME_ZONE = 'Asia/Bangkok';
export const ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  COMPANY: 'COMPANY',
};

export const GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
};

export const JOB_TYPE = {
  full_time: 'full_time',
  part_time: 'part_time',
  contract: 'contract',
};

export const JOB_TYPE_SHOWS = {
  [JOB_TYPE.full_time]: 'Full time',
  [JOB_TYPE.part_time]: 'Part time',
  [JOB_TYPE.contract]: 'Contract',
};

export const LOCATION_TYPE = {
  IN_OFFICE: 'IN_OFFICE',
  REMOTE: 'REMOTE',
  HYBRID: 'HYBRID',
};

export const LOCATION_TYPE_SHOWS = {
  [LOCATION_TYPE.IN_OFFICE]: 'In office',
  [LOCATION_TYPE.REMOTE]: 'Remote',
  [LOCATION_TYPE.HYBRID]: 'Hybrid',
};

export const APPLY_STATUS = {
  UNDER_REVIEW: 'UNDER_REVIEW',
  INTERVIEWING: 'INTERVIEWING',
  OFFERING: 'OFFERING',
  EMAIL_SENT: 'EMAIL_SENT',
  REJECTED: 'REJECTED',
};

export const APPLY_STATUS_SHOWS = {
  [APPLY_STATUS.UNDER_REVIEW]: 'Under review',
  [APPLY_STATUS.INTERVIEWING]: 'Interviewing',
  [APPLY_STATUS.OFFERING]: 'Offering',
  [APPLY_STATUS.EMAIL_SENT]: 'Email sent',
  [APPLY_STATUS.REJECTED]: 'Reject',
};
