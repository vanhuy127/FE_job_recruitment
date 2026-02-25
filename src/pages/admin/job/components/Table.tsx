import { Link } from 'react-router-dom';

import { TableSkeleton } from '@/components/shared/tableSkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { DATE_PATTERN, JOB_TYPE_SHOWS, LOCATION_TYPE_SHOWS, ROUTE_PATH } from '@/constants';
import { Job } from '@/interface';
import { formatDate } from '@/utils';

import Action from './Action';

interface TableDataProps {
  data?: Job[];
  isLoading: boolean;
}

export const TableData = ({ data, isLoading = false }: TableDataProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10 text-center">ID</TableHead>
          <TableHead className="text-center">Tên việc làm</TableHead>
          <TableHead className="text-center">Công ty</TableHead>
          <TableHead className="text-center">Địa chỉ</TableHead>
          <TableHead className="text-center">Loại công việc</TableHead>
          <TableHead className="text-center">Loại địa điểm</TableHead>
          <TableHead className="text-center">Lương</TableHead>
          <TableHead className="text-center">Trạng thái</TableHead>
          <TableHead className="text-center">Ngày tạo</TableHead>
          <TableHead className="text-center">Cập nhật cuối</TableHead>
          <TableHead className="text-center">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableSkeleton cols={11} />
        ) : data && data.length > 0 ? (
          data.map((job, index) => (
            <TableRow key={job.id} className="hover:bg-cyan-50/50 dark:hover:bg-gray-700">
              <TableCell>#{index + 1}</TableCell>
              <TableCell>
                <Link to={ROUTE_PATH.ADMIN.JOBS.DETAILS.LINK(job.id)}>{job.title}</Link>
              </TableCell>
              <TableCell>{job.organization.name}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{JOB_TYPE_SHOWS[job.jobType]}</TableCell>
              <TableCell>{LOCATION_TYPE_SHOWS[job.locationType]}</TableCell>
              <TableCell>{job.salary}</TableCell>
              <TableCell>{job.status}</TableCell>
              <TableCell>{formatDate(job.createdAt, DATE_PATTERN.DATE_TIME)}</TableCell>
              <TableCell>{formatDate(job.updatedAt, DATE_PATTERN.DATE_TIME)}</TableCell>
              <TableCell>
                <Action data={job} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={11} className="text-center">
              Không tìm thấy dữ liệu
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
