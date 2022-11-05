import React from 'react'
import authUtils from '../utils/authUtils'
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'

const AuthLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = await authUtils.isAuthenticated();
            if(isAuth) {
                navigate('/')
            }
        }
        checkAuth();
    }, [navigate])

  return (
    <>
        <Outlet />
    </>
  )
}

export default AuthLayout