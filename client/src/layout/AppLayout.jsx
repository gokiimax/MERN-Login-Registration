import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import authUtils from '../utils/authUtils';
import { setUser } from '../redux/features/userSlice';

const AppLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)

    useEffect(() => {
        const checkAuth = async () => {
            const authUser = await authUtils.isAuthenticated();
            if(!authUser) {
                navigate('/login')
            } else {
                setUser(authUser)
                dispatch(setUser(authUser))
            }
        }
        checkAuth();
    }, [navigate, dispatch])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
        <h1>Welcome Back {user.username}</h1>
    </div>
  )
}

export default AppLayout