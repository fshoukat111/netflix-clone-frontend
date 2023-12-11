import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
export const CreatorProductedRoute = () => {
  const [isCreator, setIsCreator] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isCreatorTrue = localStorage.getItem("role");
    setIsCreator(isCreatorTrue);
  }
    , [])

  return (
    <>
      {
        isCreator === "creator" ? <Outlet /> : navigate('/signin')
      }
    </>
  )
}
