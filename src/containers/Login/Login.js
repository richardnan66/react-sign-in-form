import { useState, useCallback } from 'react';
import FormInputField from '../../components/FormInputField';
import Checkbox from '../../components/Checkbox';
import { validateEmail, validatePassowrd } from '../../utils/validator';
import { login, resendEmail } from '../../api';
import { SUBMIT_ERROR_MSG, DISPLAY_ERROR_DURATION } from '../../constants';
import './Login.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isRememberChecked, setRememberChecked] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [resendError, setResendError] = useState('');

  // use hook functions to update statuses in form
  const handleChangeEmail = useCallback((newEmail) => {
    // handle email
    setEmail(newEmail);
    setEmailError(null);
  }, [setEmail, setEmailError]);

  const handleChangePassword = useCallback((newPassword) => {
    // handle chaning password
    setPassword(newPassword);
    setPasswordError(null);
  }, [setPassword, setPasswordError]);

  const handleRememberChanged = useCallback((rememberChecked) => {
    setRememberChecked(rememberChecked);
  }, [setRememberChecked]);

  const handleResendClick = useCallback(async () => {
    try {
        const payload = { email }

        // send api request to resend email
        await resendEmail(payload);

        alert('Email is sent.');
    } catch(e) {
        console.log(e);

        setResendError(SUBMIT_ERROR_MSG);
        setTimeout(() => {
            setResendError(null);
        }, DISPLAY_ERROR_DURATION);
        
    }
  }, [email, setResendError]);

  const handleSubmit = useCallback(async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
        let validateError = validateEmail(email);

        if (validateError)  {
            setEmailError(validateError);
        } else {
            setEmailError(null);
            validateError = validatePassowrd(password);
            if (validateError)  {
                setPasswordError(validateError);
            } else {
                setPasswordError(null);
            }
        }

        if (validateError) {
            return;
        }

        const payload = {
            email,
            password,
            isRememberChecked
        };

        // send api request to login
        await login(payload);

        alert('Login Succeed!');
    } catch(e) {
        console.log(e);

        setSubmitError(SUBMIT_ERROR_MSG);
        setTimeout(() => {
            setSubmitError(null);
        }, DISPLAY_ERROR_DURATION);
        
    }
  }, [email, password, isRememberChecked, setEmailError, setPasswordError, setSubmitError]);

  return (
    <div className="login-page">
      <form
        className="login-form"
        name="loginForm"
        onSubmit={handleSubmit}
      >
        <h2 className="form-title">Sign in</h2>
        <FormInputField
            label="Email"
            value={email}
            error={emailError}
            autofocus={true}
            onChange={handleChangeEmail}
        >
        </FormInputField>
        <FormInputField
            className="password-field"
            label="Password"
            type="password"
            value={password}
            error={passwordError}
            onChange={handleChangePassword}
        >
        </FormInputField>
        <Checkbox
            label="Remember me?"
            checked={isRememberChecked}
            onChange={handleRememberChanged}
        >
        </Checkbox>
        <div className="action-btn-wrapper signin">
            <button className="standard-button">Sign in</button>
            { submitError && <label className="error-label">{submitError}</label> }
        </div>
        <div className="form-footer">
            <a href="/">Forgot your password</a>
            <div className="signup-wrapper">
                <label className="signup-label">Don't have an account?</label>
                <a href="/">Sign up</a>
            </div>
            <div className="action-btn-wrapper">
                <button type="button"
                    className="btn-resend-email"
                    onClick={handleResendClick}
                >Resend email confirmation</button>
                { resendError && <label className="error-label">{resendError}</label> }
            </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
