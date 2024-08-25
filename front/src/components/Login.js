import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const navigate = useNavigate();

  const onButtonClick = async () => {
    setUsernameError('');
    setPasswordError('');
    setGeneralError('');

    // Check if the user has entered both fields correctly
    if (username === '') {
      setUsernameError('Please enter your username');
      return;
    }
    if (password === '') {
      setPasswordError('Please enter your password');
      return;
    }

    try {
      // Realiza la solicitud POST con axios
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password
      });

      // Maneja la respuesta de la API
      console.log('Login successful:', response.data);
      localStorage.setItem('authToken', response.data.token);
      // Redirige al usuario a otra página después de un inicio de sesión exitoso
      navigate('/inicio');
    } catch (err) {
      // Maneja errores, como credenciales incorrectas o errores de red
      setGeneralError('Login failed. Please check your username and password.');
      console.error('Error during login:', err);
    }
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={username}
          placeholder="Enter your username"
          onChange={(ev) => setUsername(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
      {generalError && <p className="errorLabel">{generalError}</p>}
    </div>
  );
};

export default Login;
