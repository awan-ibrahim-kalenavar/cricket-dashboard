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

  const onSubmitSuccess = () => {
    navigate('/Login')
  } 
 

  const onSubmitForm = async event =>{
    event.preventDefault()

    if (password === confirmPassword){
    setErrorMsg('')
    setSuccessMsg('Registered successfully!')
    onSubmitSuccess()
    } 
    else{
      setErrorMsg('Passwords do not match')
      setSuccessMsg('')
      return
    }


  
  }

  const renderNameField = () =>{
    return(
      <>
        <label className="input-label" htmlFor="name">Name</label>
        <input 
        type="text"
        id="name"
        className="input-field"
        value={name}
        onChange = {onChangeName}
        placeholder = "Enter Your Name"
        />
      </>
    )

  }

  const renderEmailField = () =>{
    return(
      <>
        <label className="input-label" htmlFor="email">Email</label>
        <input 
        type="text"
        id="email"
        className="input-field"
        value={email}
        onChange={onChangeEmail}
        placeholder="Enter Email"
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
        <label className="input-label" htmlFor="confirm-password">Confirm Password</label>
        <input 
        type="password"
        id="confirm-password"
        className="input-field"
        value={confirmPassword}
        onChange={onChangeConfirmPassword}
        placeholder="Confirm Password"
        />
      </>
    )
  }

  return(
    <div className="register-form-container">
      <form className="form-container" onSubmit={onSubmitForm}>
        <h1 className="heading">CREATE ACCOUNT</h1>

        <div className="input-container">
          {renderNameField()}
        </div>

        <div className="input-container">
          {renderEmailField()}
        </div>

        <div className="input-container">
          {renderPasswordField()}
        </div>

        <div className="input-container">
          {renderConfirmPasswordField()}
        </div>

        <button className="button" type="submit">{t('register')}</button>

        {errorMsg && <p className="error-msg">*{errorMsg}</p>}
        {successMsg && <p className="success-msg">{successMsg}</p>}


      </form>

    </div>
  )


}

export default Register;