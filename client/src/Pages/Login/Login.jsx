import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authApi from '../../api/authApi';
import './Login.css'

const Login = () => {
    const navigate = useNavigate();
    const [usernameErrText, setUsernameErrText] = useState('Username')
    const [passwordErrText, setPasswordErrText] = useState('Password')

    const handleSubmit = async(e) => {
        e.preventDefault();
        setUsernameErrText('')
        setPasswordErrText('')

        const data = new FormData(e.target)
        const username = data.get('username').trim();
        const password = data.get('password').trim();

        let err = false

        if(username === '') {
          err = true
          setUsernameErrText('Please fill this field')
        }
        if(password === '') {
          err = true
          setPasswordErrText('Please fill this field')
        }

        if(err) return;

        try {
            const res = await authApi.login({ username, password })
            localStorage.setItem('token', res.token)
            navigate('/')
        } catch (error) {
            const errors = error.data.errors;
            errors.forEach(e => {
              if(e.param === 'username') {
                setUsernameErrText(e.msg)
              }
              if(e.param === 'password') {
                setPasswordErrText(e.msg)
              }
            })
        }
    }

    return (
        <>
            <div className="center">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="txt_field">
                        <input type="text" required name='username' id='username' />
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" required name='password' id='password' />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <input type="submit" value="Login" />
                    <div className="signup_link">
                        Not a member? <a href='/register'>Signup</a>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login