// src/routes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Spin } from 'antd';
// import ProtectedRoute from './components/Auth/ProtectedRoute';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products = lazy(() => import('./pages/Products'));
const Orders = lazy(() => import('./pages/Orders'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spin size="large" className="absolute top-1/2 left-1/2" />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={<ProtectedRoute />}> */}
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
        {/* </Route> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;