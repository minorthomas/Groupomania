import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    const firstnameError = document.querySelector(".firstname.error");
    const lastnameError = document.querySelector(".lastname.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );

    passwordConfirmError.innerHTML = "";

    if (password !== controlPassword) {
      passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}user/register`,
        withCredentials: true,
        data: {
          firstname,
          lastname,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            firstnameError.innerHTML = res.data.errors.firstname;
            lastnameError.innerHTML = res.data.errors.lastname;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((error) => console.log(error));
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
          <label htmlFor="firstname">Prénom</label>
          <br />
          <input
            type="text"
            name="firstname"
            id="firstname"
            onChange={(event) => setFirstname(event.target.value)}
            value={firstname}
          />
          <div className="firstname error"></div>
          <br />

          <label htmlFor="lastname">Nom</label>
          <br />
          <input
            type="text"
            name="lastname"
            id="lastname"
            onChange={(event) => setLastname(event.target.value)}
            value={lastname}
          />
          <div className="lastname error"></div>
          <br />

          <label htmlFor="email">Adresse mail</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />

          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />

          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(event) => setControlPassword(event.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="submit" value="Inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
