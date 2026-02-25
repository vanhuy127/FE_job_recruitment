'use client';

import { useQuery } from '@tanstack/react-query';

import { useJobService } from '@/service/job.service';

import { TableData } from './components/Table';

const index = () => {
  const { getJobs } = useJobService();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-jobs'],
    queryFn: () => getJobs(),
  });

  return (
    <div className="space-y-6 overflow-hidden dark:bg-black dark:text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Danh sách việc làm</h1>
      </div>

      {/* table */}
      <TableData data={data?.jobs} isLoading={isLoading} />
    </div>
  );
};
export default index;
