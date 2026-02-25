import { useCallback, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';

import StatusFilter from '@/components/shared/statusFilter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { APPLY_STATUS, APPLY_STATUS_SHOWS, DATE_PATTERN, JOB_TYPE_SHOWS, LOCATION_TYPE_SHOWS } from '@/constants';
import { JobApply } from '@/interface';
import { useJobService } from '@/service/job.service';
import { formatDate } from '@/utils';

const Details = () => {
  const { getJobs } = useJobService();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-jobs'],
    queryFn: () => getJobs(),
  });

  const job = useMemo(() => data?.jobs.find((item) => item.id === id), [data?.jobs, id]);
  const [statusFilter, setStatusFilter] = useState<JobApply['status'] | 'ALL'>('ALL');
  const filteredApplies = useMemo(() => {
    if (!job?.jobApplies) return [];
    if (statusFilter === 'ALL') return job.jobApplies;

    return job.jobApplies.filter((apply) => apply.status === statusFilter);
  }, [job?.jobApplies, statusFilter]);

  const StatusOptions = useMemo(
    () => [
      {
        label: 'All',
        value: 'ALL',
      },
      ...Object.keys(APPLY_STATUS).map((status) => ({
        label: APPLY_STATUS_SHOWS[status],
        value: status,
      })),
    ],
    [],
  );

  const handleStatusChange = useCallback((value: string) => {
    setStatusFilter(value as JobApply['status'] | 'ALL');
  }, []);

  if (isLoading) return <div>loading...</div>;

  if (!job) {
    return (
      <Card>
        <CardContent className="py-10 text-center">Không tìm thấy công việc.</CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Thông tin công việc</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm">Mã công việc</p>
              <p className="font-medium">{job.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Trạng thái</p>
              <p className="font-medium">{job.status}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Tiêu đề</p>
              <p className="font-medium">{job.title}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Công ty</p>
              <p className="font-medium">{job.organization.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Địa điểm</p>
              <p className="font-medium">{job.location}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Loại địa điểm</p>
              <p className="font-medium">{LOCATION_TYPE_SHOWS[job.locationType]}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Loại công việc</p>
              <p className="font-medium">{JOB_TYPE_SHOWS[job.jobType]}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Mức lương</p>
              <p className="font-medium">{job.salary}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Ngày tạo</p>
              <p className="font-medium">{formatDate(job.createdAt, DATE_PATTERN.DATE_TIME)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Cập nhật cuối</p>
              <p className="font-medium">{formatDate(job.updatedAt, DATE_PATTERN.DATE_TIME)}</p>
            </div>
          </div>

          <div>
            <p className="text-muted-foreground mb-1 text-sm">Thông tin công ty</p>
            <p className="rounded-md border p-3 text-sm whitespace-pre-wrap">{parse(job.about) || 'No data'}</p>
          </div>

          <div>
            <p className="text-muted-foreground mb-1 text-sm">Mô tả công việc</p>
            <p className="rounded-md border p-3 text-sm whitespace-pre-wrap">
              {parse(job.responsibilities) || 'No data'}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground mb-1 text-sm">Yêu cầu tối thiểu</p>
            <p className="rounded-md border p-3 text-sm whitespace-pre-wrap">
              {parse(job.minimumQualifications) || 'No data'}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground mb-1 text-sm">Yêu cầu ưu tiên</p>
            <p className="rounded-md border p-3 text-sm whitespace-pre-wrap">
              {parse(job.preferredRequirement) || 'No data'}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground mb-1 text-sm">Quyền lợi</p>
            <p className="rounded-md border p-3 text-sm whitespace-pre-wrap">{parse(job.benefits) || 'No data'}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Danh sách CV đã nộp ({filteredApplies.length}/{job.jobApplies?.length ?? 0})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="w-full max-w-56">
            <StatusFilter
              placeholder="Lọc theo trạng thái"
              statusFilter={statusFilter}
              setStatusFilter={handleStatusChange}
              options={StatusOptions}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ứng viên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Độ phù hợp</TableHead>
                <TableHead>Đánh giá sự phù hợp</TableHead>
                <TableHead>Trạng thái ứng tuyển</TableHead>
                <TableHead>Ngày nộp</TableHead>
                <TableHead>CV</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplies.length > 0 ? (
                filteredApplies.map((apply) => (
                  <TableRow key={apply.id}>
                    <TableCell>{apply.talent.user.name}</TableCell>
                    <TableCell>{apply.talent.user.email}</TableCell>
                    <TableCell>{apply.recruiterData?.matchScore ?? '-'}</TableCell>
                    <TableCell>{apply.recruiterData?.fitAssessment ? 'Có' : 'Không'}</TableCell>
                    <TableCell className="w-52">
                      <Select value={apply.status}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(APPLY_STATUS) as JobApply['status'][]).map((status) => (
                            <SelectItem key={status} value={status}>
                              {APPLY_STATUS_SHOWS[status]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{formatDate(apply.createdAt, DATE_PATTERN.DATE_TIME)}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Xem CV
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{apply.talent.user.name}</DialogTitle>
                            <DialogDescription>{apply.talent.user.email}</DialogDescription>
                          </DialogHeader>

                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="font-medium">Ví: </span>
                              {apply.candidateWalletAddress?.address || '-'}
                            </p>
                            <p>
                              <span className="font-medium">Điểm phù hợp: </span>
                              {apply.recruiterData?.matchScore ?? '-'}
                            </p>
                            <p>
                              <span className="font-medium">Tóm tắt: </span>
                            </p>
                            <p className="rounded-md border p-3 whitespace-pre-wrap">
                              {apply.recruiterData?.summary || 'No summary'}
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    {statusFilter === 'ALL'
                      ? 'Chưa có CV nào ứng tuyển cho công việc này.'
                      : 'Không có CV nào với trạng thái được chọn.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
