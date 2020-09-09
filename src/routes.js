import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import Dashboard from 'src/views/dashboard';
import Totals from 'src/views/totals';
import Distribution from 'src/views/distribution';
import Correlation from 'src/views/correlation';
import Regression from 'src/views/regression';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Navigate to="dashboard" /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'totals', element: <Totals /> },
      { path: 'distribution', element: <Distribution /> },
      { path: 'correlation', element: <Correlation /> },
      { path: 'regression', element: <Regression /> },
    ]
  }
];

export default routes;
