import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(ROUTE_PATH.ADMIN.JOBS.LIST);
  }, []);

  return <div>Home</div>;
};

export default Home;
