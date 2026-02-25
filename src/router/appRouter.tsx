import { useEffect, useState } from 'react';

import { useRoutes } from 'react-router-dom';

import { LoadingIndicator } from '@/components/shared/loadingIndicator';

import GlobalRoutes from '@/router/global';
import PrivateRoutes from '@/router/private';
import { useAuthService } from '@/service/auth.service';
import { useAuthStore } from '@/store';

import OnLyNotAuthRoutes from './onlyNotAuth';

export const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getMe } = useAuthService();
  const { user } = useAuthStore();

  const initAuth = async () => {
    try {
      if (!user) {
        await getMe();
      }
    } finally {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const routing = useRoutes([...PrivateRoutes, ...GlobalRoutes, ...OnLyNotAuthRoutes]);
  if (!isAuthenticated) {
    return <LoadingIndicator />;
  }

  return <>{routing}</>;
};
