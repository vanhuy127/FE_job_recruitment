import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT, LOCAL_STORAGE_KEY, ROLE } from '@/constants';
import { IResponse } from '@/interface';
import { useAuthStore } from '@/store';
import { removeLocalStorage, setLocalStorage } from '@/utils';

export const useAuthService = () => {
  const { setUser } = useAuthStore();

  const login = async (email: string, password: string) => {
    const res = await axiosClient.post(END_POINT.AUTH.LOGIN, { email, password });
    if (res.data) {
      const { accessToken, id, email, role } = res.data;
      setUser({ id, email, role });
      setLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
      toast.success('Login success');
    }
  };

  const logout = async () => {
    const res: IResponse<null> = await axiosClient.get(END_POINT.AUTH.LOGOUT);

    if (res && res.success) {
      removeLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      setUser(null);
      toast.success('Logout success');
    }
  };

  const getMe = async () => {
    // const result: IResponse<IUserAccount> = await axiosClient.get(END_POINT.AUTH.ME, {
    //   headers: {
    //     'Cache-Control': 'no-cache',
    //   },
    // });
    // if (result.success && result.data) {
    //   setUser(result.data);
    // }

    //giả định dữ liệu người dùng trả về sau khi đăng nhập
    setUser({
      id: '1',
      email: 'admin@gmail.com',
      role: ROLE.ADMIN,
    });
  };

  return {
    login,
    getMe,
    logout,
  };
};
