import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const Log = () => {
  const [signUpModal, setSignUpModal] = useState(true);
  const [signInModal, setSignInModal] = useState(false);

  const handleModals = (event) => {
    if (event.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (event.target.id === "login") {
      setSignInModal(true);
      setSignUpModal(false);
    }
  };

  return (
    <div className="connection_form">
      <img
        src="https://image.winudf.com/v2/image1/Y29tLndhbGxwYXBlcnMuYW5kLmJhY2tncm91bmRzLm5pZ2h0Y2l0eS53YWxscGFwZXJzLmhkX3NjcmVlbl8xNF8xNTczMTA0MDM5XzA2OA/screen-14.jpg?fakeurl=1&type=.jpg"
        className="connection_form_background"
        alt="Ville"
      />
      <div className="form_container">
        <h2
          onClick={handleModals}
          id="register"
          className={signUpModal ? "active_btn" : "inactive_btn"}
        >
          Inscription
        </h2>
        <h2
          onClick={handleModals}
          id="login"
          className={signInModal ? "active_btn" : "inactive_btn"}
        >
          Connexion
        </h2>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;
