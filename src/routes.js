import React from 'react';
import DashboardLayout from 'src/layouts/DashboardLayout';
import Dashboard from 'src/views/dashboard';
import Totals from 'src/views/totals';
import Distribution from 'src/views/distribution';
import Corelation from 'src/views/corelation';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: 'totals', element: <Totals /> },
      { path: 'distribution', element: <Distribution /> },
      { path: 'corelation', element: <Corelation /> },
    ]
  }
];

export default routes;
