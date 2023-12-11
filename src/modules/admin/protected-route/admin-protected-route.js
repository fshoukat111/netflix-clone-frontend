import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
export const AdminProductedRoute = () => {
  const [isAdmin, setIsAdmin] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAdminTrue = localStorage.getItem("role");
    setIsAdmin(isAdminTrue);
  }
    , [])

  return (
    <>
      {
        isAdmin === "admin" ? <Outlet /> : navigate('/signin')
      }
      {/* <Outlet /> */}
    </>
  )
}
