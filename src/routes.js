import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import Dashboard from 'src/views/dashboard';
import Totals from 'src/views/totals';
import Distribution from 'src/views/distribution';
import Correlation from 'src/views/correlation';
import Regression from 'src/views/regression';
import { links } from 'src/utils/navigation-urls';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Navigate to="dashboard" /> },
      { path: links.dashboard.path, element: <Dashboard /> },
      { path: links.totals.path, element: <Totals /> },
      { path: links.distribution.path, element: <Distribution /> },
      { path: links.correlation.path, element: <Correlation /> },
      { path: links.regression.path, element: <Regression /> }
    ]
  }
];

export default routes;
