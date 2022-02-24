import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}auth/login`,
      withCredentials: false,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.message;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "#";
        }
      })
      .catch((res) => {
        console.error(res);
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <input
        type="email"
        name="email"
        id="email"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />
      <div className="email error"></div>
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
      <input type="submit" value="Se connecter" className="form_submit" />
    </form>
  );
};

export default SignInForm;
