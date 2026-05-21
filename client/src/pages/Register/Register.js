import React, {useState} from "react";
import axios from "axios";
import './Register.css'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Login form states
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  
  const navigate = useNavigate()


  const onChangeName = event => {
    setName(event.target.value)
  } 

  const onChangeEmail = event => {
    setEmail(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onChangeConfirmPassword = event => {
    setConfirmPassword(event.target.value)
  }

  const onChangeLoginEmail = event => {
    setLoginEmail(event.target.value)
  }

  const onChangeLoginPassword = event => {
    setLoginPassword(event.target.value)
  }

  const onLoginSubmit = async (event) => {
    event.preventDefault()
    setLoginLoading(true)
    setLoginError('')

    try {
      
      setLoginError('')
      setLoginLoading(false)
      navigate('/home')
      
    } catch (error) {
      console.error('Login error:', error)
      setLoginError('Invalid email or password')
      setLoginLoading(false)
    }
  }

  const onSubmitSuccess = () => {
    navigate('/Login')
  }

  const handleGoogleSignup = () => {
    // Simulate Google OAuth signup
    const userData = {
      name: 'Google User',
      email: 'user@gmail.com',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      registeredAt: new Date().toISOString()
    };
    
    // SAVE USER DATA
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    
    setSuccessMsg('🎉 Google signup successful! Redirecting...')
    setTimeout(() => {
      navigate('/home')
    }, 2000)
  } 
 

  const onSubmitForm = async event =>{
    event.preventDefault()
    setLoading(true)
    setErrorMsg('')

    if (password !== confirmPassword){
      setErrorMsg('Passwords do not match')
      setSuccessMsg('')
      setLoading(false)
      return
    }

    try {
    
      const checkResponse = await axios.get(`http://localhost:5000/api/users?email=${email}`);
      
      if (checkResponse.data.success && checkResponse.data.data.length > 0) {
        setErrorMsg('📧 This email is already registered. Please login to your account.')
        setLoading(false)
        return
      }

      
      const notificationResponse = await axios.post('http://localhost:5000/api/users', {
        name,
        email,
        preferences: {
          email: true,
          sms: false,
          whatsapp: false,
          matchReminders: true,
          liveAlerts: true,
          resultAlerts: true
        }
      });

      if (notificationResponse.data.success) {
        // SAVE USER DATA
        const userData = {
          name: name,
          email: email,
          joinDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          registeredAt: new Date().toISOString()
        };
        localStorage.setItem('loggedInUser', JSON.stringify(userData));
        
        setErrorMsg('')
        setSuccessMsg('🎉 Registered successfully!')
        setTimeout(() => {
          navigate('/home')  // Go to home directly after registration
        }, 2000)
      } else {
        setErrorMsg(notificationResponse.data.message || 'Registration failed')
      }

    } catch (error) {
      console.error('Registration error:', error)
      setErrorMsg('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderNameField = () =>{
    return(
      <>
        <label className="input-label" htmlFor="name">Name *</label>
        <input 
          type="text"
          id="name"
          className="input-field"
          value={name}
          onChange = {onChangeName}
          placeholder = "Enter Your Name"
          required
        />
      </>
    )
  }

  const renderEmailField = () =>{
    return(
      <>
        <label className="input-label" htmlFor="email">Email *</label>
        <input 
          type="email"
          id="email"
          className="input-field"
          value={email}
          onChange={onChangeEmail}
          placeholder="Enter Email"
          required
        />
      </>
    )
  }

  
  const renderPasswordField = () => {
    return(
      <>
      <label className="input-label" htmlFor="password">Password</label>
      <input 
        type="password"
        id="password"
        className="input-field"
        value={password}
        onChange={onChangePassword}
        placeholder="Enter Password"
        />
        </>
    )

  }

  const renderConfirmPasswordField = () => {
    return(
      <>
        <label className="input-label" htmlFor="confirm-password">Confirm Password *</label>
        <input 
          type="password"
          id="confirm-password"
          className="input-field"
          value={confirmPassword}
          onChange={onChangeConfirmPassword}
          placeholder="Confirm Password"
          required
        />
      </>
    )
  }

  const renderLoginEmailField = () => {
    return(
      <>
        <label className="input-label" htmlFor="login-email">Email *</label>
        <input 
          type="email"
          id="login-email"
          className="input-field"
          value={loginEmail}
          onChange={onChangeLoginEmail}
          placeholder="Enter Email"
          required
        />
      </>
    )
  }

  const renderLoginPasswordField = () => {
    return(
      <>
        <label className="input-label" htmlFor="login-password">Password *</label>
        <input 
          type="password"
          id="login-password"
          className="input-field"
          value={loginPassword}
          onChange={onChangeLoginPassword}
          placeholder="Enter Password"
          required
        />
      </>
    )
  }

  
  return(
    <div className="auth-page">
      <div className="auth-container">
        
        <div className="auth-left">
          <div className="brand-section">
            <div className="brand-logo">
              🏏 Cricket Dashboard
            </div>
            <h2 className="brand-title">Welcome to Cricket Dashboard</h2>
            <p className="brand-subtitle">
              Get live cricket scores, match updates, and personalized notifications
            </p>
           
          </div>
        </div>

        
        <div className="auth-right">
          <div className="form-tabs">
            <button 
              className={`tab-btn ${!showLogin ? 'active' : ''}`}
              onClick={() => setShowLogin(false)}
            >
              Register
            </button>
            <button 
              className={`tab-btn ${showLogin ? 'active' : ''}`}
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </div>

        
          {!showLogin && (
            <form className="auth-form" onSubmit={onSubmitForm}>
              <h3 className="form-title">Create Your Account</h3>
              
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-wrapper">
                  <span className="input-icon"></span>
                  <input 
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={onChangeName}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon"></span>
                  <input 
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={onChangeEmail}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon"></span>
                  <input 
                    type="password"
                    className="form-input"
                    value={password}
                    onChange={onChangePassword}
                    placeholder="Create a strong password"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="input-wrapper">
                  <span className="input-icon"></span>
                  <input 
                    type="password"
                    className="form-input"
                    value={confirmPassword}
                    onChange={onChangeConfirmPassword}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <button className="submit-btn" type="submit" disabled={loading}>
                {loading ? (
                  <span className="loading-text">
                    <span className="spinner"></span>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>

              <div className="divider-section">
                <div className="divider-line"></div>
                <span className="divider-text">OR</span>
                <div className="divider-line"></div>
              </div>

              <button className="google-btn" type="button" onClick={handleGoogleSignup}>
                <svg className="google-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {errorMsg && <div className="error-message">{errorMsg}</div>}
              {successMsg && <div className="success-message">{successMsg}</div>}
            </form>
          )}

          
          {showLogin && (
            <form className="auth-form" onSubmit={onLoginSubmit}>
              <h3 className="form-title">Welcome Back</h3>
              
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon"></span>
                  <input 
                    type="email"
                    className="form-input"
                    value={loginEmail}
                    onChange={onChangeLoginEmail}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon"></span>
                  <input 
                    type="password"
                    className="form-input"
                    value={loginPassword}
                    onChange={onChangeLoginPassword}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div className="forgot-password">
                <a href="#" className="forgot-link">Forgot Password?</a>
              </div>

              <button className="submit-btn" type="submit" disabled={loginLoading}>
                {loginLoading ? (
                  <span className="loading-text">
                    <span className="spinner"></span>
                    Logging In...
                  </span>
                ) : (
                  'Login'
                )}
              </button>

              {loginError && <div className="error-message">{loginError}</div>}
            </form>
          )}
        </div>
      </div>
    </div>
  )


}

export default Register;