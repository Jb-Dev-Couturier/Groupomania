import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [controlPassword, setControlPassword] = useState('');
  const [viewPass, setViewPass] = useState('password');

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById('terms');
    const pseudoError = document.querySelector('.pseudo.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const passwordConfirmError = document.querySelector(
      '.password-confirm.error'
    );
    const termsError = document.querySelector('.terms.error');

    passwordConfirmError.innerHTML = '';
    termsError.innerHTML = '';

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          'Les mots de passe ne correspondent pas';

      if (!terms.checked)
        termsError.innerHTML = 'Veuillez valider les conditions générales';
    } else {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}auth/register`,
        data: {
          pseudo,
          username,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.username;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleViewPass = () => {
    if (viewPass === 'password') {
      setViewPass('text');
    } else if (viewPass === 'text') {
      setViewPass('password');
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <div className="pseudo error"></div>
          <br />

          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
          />
          <div className="email error"></div>
          <br />
          <div className="box">
            <div className="inputBox">
              <label htmlFor="password">Mot de passe</label>
              <br />
              <input
                type={viewPass}
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <span id="togglebtn" onClick={handleViewPass}>
                {viewPass === 'password' ? (
                  <RemoveRedEyeRoundedIcon />
                ) : (
                  <VisibilityOffRoundedIcon />
                )}
              </span>
            </div>
            <div className="password error"></div>
            <br />
          </div>

          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br />
          <input
            type={viewPass}
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{' '}
            <a href="/" target="_blank" rel="noopener noreferrer">
              Conditions Générales
            </a>
          </label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="Valider Inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
