import { axiosClient } from '@/config/axios';
import { END_POINT } from '@/constants';
import { JobsResponse } from '@/interface';

export const useJobService = () => {
  const getJobs = async () => {
    const res: JobsResponse = await axiosClient.get(END_POINT.ADMIN.JOBS.LIST);

    return res;
  };

  return {
    getJobs,
  };
};
