import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
export const ViewerProductedRoute = () => {
  const [isViewer, setIsViewer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isViewerTrue = localStorage.getItem("role");
    setIsViewer(isViewerTrue);
  }
    , [])

  return (
    <>
      {
        isViewer === "viewer" ? <Outlet /> : navigate('/signin')
      }
    </>
  )
}
