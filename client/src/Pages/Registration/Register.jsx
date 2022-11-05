import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import authApi from '../../api/authApi';
import './Register.css'

const Register = () => {
    const navigate = useNavigate();
    const [usernameErrText, setUsernameErrText] = useState('');
    const [passwordErrText, setPasswordErrText] = useState('');
    const [confirmPassErrText, setConfirmPassErrText] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault()
        setUsernameErrText('')
        setPasswordErrText('')
        setConfirmPassErrText('')

        console.log(e.target)

        const data = new FormData(e.target)
        const username = data.get("username").trim()
        const password = data.get('password').trim()
        const confirmPassword = data.get('confirmPassword').trim()

        let err = false;

        if(username === '') {
            err = true
            setUsernameErrText('Please fill this field')
          }
          if(password === '') {
            err = true
            setPasswordErrText('Please fill this field')
          }
          if(confirmPassword === '') {
            err = true
            setConfirmPassErrText('Please fill this field')
          }
          if(password !== confirmPassword) {
            err = true
            setConfirmPassErrText('Confirm password must be your password')
          }

          if(err) return;

          try {
            const res = await authApi.register({
                username,
                password,
                confirmPassword
            })

            console.log(res.data)

            localStorage.setItem('token', res.token)
            navigate('/')
          } catch (error) {
            console.log(error)
            const errors = error.data.errors;
            errors.forEach(e => {
              if(e.param === 'username') {
                setUsernameErrText(e.msg)
              }
              if(e.param === 'password') {
                setPasswordErrText(e.msg)
              }
              if(e.param === 'confirmPassword') {
                setConfirmPassErrText(e.msg)
              }
            })
          }

    }

    return (
        <>
            <div className="center">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="txt_field">
                        <input type="text" required id='username' name='username'/>
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" required id='password' name='password'/>
                        <span></span>
                        <label>Password</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" required id='confirmPassword' name='confirmPassword'/>
                        <span></span>
                        <label>Confirm Password</label>
                    </div>
                    <input type="submit" value="Register" />
                    <div className="signup_link">
                        Already a member? <a href="/login">Login</a>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register