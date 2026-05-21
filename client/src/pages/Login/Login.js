import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import Cookies from 'js-cookie'
import './Login.css'

const LoginForm = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = (response) => {
    // SAVE TOKEN
    if (response.token) {
      Cookies.set('jwt_token', response.token, {
        expires: 30,
        path: '/',
      });
      localStorage.setItem('token', response.token);
    }

    // SAVE USER DATA
    if (response.user) {
      localStorage.setItem('loggedInUser', JSON.stringify(response.user));
    }

    navigate('/home')
  }

  const submitForm = async event => {
    event.preventDefault()

    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    const userDetails = {
      username, 
      password,
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
        }
      )

      const data = await response.json()

      if (data.success) {
        setSuccessMsg(t('loginSuccess') || 'Login successful')
        onSubmitSuccess(data)  // Pass full response data
      } else {
        setErrorMsg(data.message || 'Login failed')
      }
    } catch (error) {
      setErrorMsg('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        {t('username')}
      </label>
      <input
        type="text"
        id="username"
        className="username-input-field"
        value={username}
        onChange={onChangeUsername}
        placeholder={t('username')}
        required
      />
    </>
  )

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        {t('password')}
      </label>
      <input
        type="password"
        id="password"
        className="password-input-field"
        value={password}
        onChange={onChangePassword}
        placeholder={t('password')}
        required
      />
    </>
  )

  return (
    <div className="login-form-container">
      <form className="form-container" onSubmit={submitForm}>

        <div className="input-container">
          {renderUsernameField()}
        </div>

        <div className="input-container">
          {renderPasswordField()}
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Loading...' : t('login')}
        </button>

        {errorMsg && <p className="error-msg">*{errorMsg}</p>}
        {successMsg && <p className="success-msg">{successMsg}</p>}
      </form>
    </div>
  )
}

export default LoginForm