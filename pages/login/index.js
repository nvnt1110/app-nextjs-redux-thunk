import { Button, TextField, Typography } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import Router from 'next/router'
import { ISLOGIN } from '../../commons/Constants'

const Login = () => {
    React.useEffect(() => {
        if (localStorage.getItem(ISLOGIN) === 'success') {
            Router.push('/admin')
        }
    })
    const refPassword = useRef(null)
    const refUsername = useRef(null)
    const [state, setState] = useState({
        username: '',
        password: '',
        checkUsername: '',
        checkPassword: '',
    })

    const onChangeText = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const handlerEnterUsername = (e) => {
        if (e.key === 'Enter') {
            refPassword.current.focus()
        }
    }

    const handleEnterLogin = (e) => {
        if (e.key === 'Enter') {
            onLogin()
        }
    }

    const onLogin = () => {
        const { username, password } = state
        if (username.length === 0) {
            refUsername.current.focus()
            setState({ ...state, checkUsername: 'Login.Validation.UsernameEmpty', checkPassword: '' })
            return
        }

        if (password.length === 0) {
            refPassword.current.focus()
            setState({ ...state, checkPassword: 'Login.Validation.PasswordEmpty', checkUsername: '' })
            return
        }

        if (username === 'admin' && password === 'admin') {
            localStorage.setItem(ISLOGIN, 'success')
            Router.push('/')
        }
    }

    return (
        <div>
            <form className="login__form">
                <Typography variant="h2" color="primary">Login Page</Typography>
                <div className="group-input">
                    <TextField
                        type="text"
                        name="username"
                        variant="outlined"
                        size="small"
                        label={'Username'}
                        fullWidth
                        onChange={onChangeText}
                        onKeyDown={handlerEnterUsername}
                        ref={refUsername} />
                    <p className="p-message">{state.checkUsername}</p>
                </div>
                <div className="group-input">
                    <TextField
                        type="password"
                        name="password"
                        label={'Password'}
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={onChangeText}
                        onKeyDown={handleEnterLogin}
                        ref={refPassword} />
                    <p className="p-message">{state.checkPassword}</p>
                </div>
                <Button variant="contained" color="secondary" className="btn-login" onClick={onLogin}>Login</Button>
            </form>
        </div>
    )
}

export default Login
