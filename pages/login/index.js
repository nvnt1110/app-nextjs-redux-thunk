// import { Button, Input } from 'antd';
import { Button, TextField, Typography  } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { setLanguage, translate } from 'react-switch-lang';
import { callApi } from '../../common/ApiUtil';
import { LANGUAGE, TOKENACCOUNT } from '../../common/Constants';

const Login = (props) => {
  const { t, history } = props;
  const refPassword = useRef(null);
  const refUsername = useRef(null);
  const [state, setState] = useState({
    username: '',
    password: '',
    checkUsername: '',
    checkPassword: '',
    lang: localStorage.getItem(LANGUAGE)
  });

  const onChangeText = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handlerEnterUsername = (e) => {
    if (e.key === 'Enter') {
      refPassword.current.focus();
    }
  }

  const handleEnterLogin = (e) => {
    if (e.key === 'Enter') {
      onLogin();
    }
  }

  const onChangeLanguage = (event) => {
    localStorage.setItem(LANGUAGE, event.target.value);
    setLanguage(event.target.value);
    setState({ ...state, lang: event.target.value });
  }

  const onLogin = () => {
    const { username, password } = state;
    if (username.length === 0) {
      refUsername.current.focus();
      setState({ ...state, checkUsername: 'Login.Validation.UsernameEmpty', checkPassword: '' });
      return;
    }

    if (password.length === 0) {
      refPassword.current.focus();
      setState({ ...state, checkPassword: 'Login.Validation.PasswordEmpty', checkUsername: '' });
      return;
    }

    callApi('/login', { usercd: username, password }).
      then(({ data, error }) => {
        if (!error) {
          localStorage.setItem(TOKENACCOUNT, JSON.stringify(data));
          history.push('/', { username });
        } else {
          refUsername.current.focus();
          setState({ ...state, checkPassword: 'Login.Validation.WrongInfo', checkUsername: '' });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <form className="login__form">
        <Typography variant="h2" color="primary">{t('Login.LoginPage')}</Typography>
        <div className="group-input">
          <TextField
            type="text"
            name="username"
            variant="outlined"
            size="small"
            label={t('Login.Username')}
            fullWidth
            onChange={onChangeText}
            onKeyDown={handlerEnterUsername}
            ref={refUsername} />
          <p className="p-message">{t(state.checkUsername)}</p>
        </div>
        <div className="group-input">
          <TextField
            type="password"
            name="password"
            label={t('Login.Password')}
            variant="outlined"
            size="small"
            fullWidth
            onChange={onChangeText}
            onKeyDown={handleEnterLogin}
            ref={refPassword} />
          <p className="p-message">{t(state.checkPassword)}</p>
        </div>
        <Button variant="contained" color="secondary" className="btn-login" onClick={onLogin}>{t('Login.BtnLogin')}</Button>
      </form>
      <div>
        <select className="language" onChange={onChangeLanguage} value={state.lang}>
          <option value="vi">vi</option>
          <option value="jp">jp</option>
        </select>
      </div>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.instanceOf(Object),
  t: PropTypes.func.isRequired,
};

export default translate(Login);
