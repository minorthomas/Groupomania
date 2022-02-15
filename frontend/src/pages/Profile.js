import React from "react";
import Log from "../components/Log";

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="log-container">
        <Log />
      </div>
    </div>
  );
};

export default Profile;

<div id="connection">
  <img
    src="https://image.winudf.com/v2/image1/Y29tLndhbGxwYXBlcnMuYW5kLmJhY2tncm91bmRzLm5pZ2h0Y2l0eS53YWxscGFwZXJzLmhkX3NjcmVlbl8xNF8xNTczMTA0MDM5XzA2OA/screen-14.jpg?fakeurl=1&type=.jpg"
    id="img_background"
    alt="Test"
  />

  <div id="connection_content">
    <img
      src="../assets/images/logo_groupomania.png"
      alt="Logo groupomania en couleur"
      id="img_logo_groupomania"
    />

    <div id="connection_content_titles">
      <h2 class="active">Inscription</h2>
      <h2 class="inactive">Inscription</h2>

      <h2 class="active">Connexion</h2>
      <h2 class="inactive">Connexion</h2>
    </div>

    <form id="connection_content_form">
      <input
        type="text"
        name="firstname"
        placeholder="Nom"
        id="firstname"
        class="form_input_signup"
      />
      <p class="invalid_input">3 caractères min!</p>

      <input
        type="text"
        name="lastname"
        placeholder="Prénom"
        id="lastname"
        class="form_input_signup"
      />
      <p class="invalid_input">3 caractères min!</p>

      <input
        name="email"
        placeholder="Adresse mail"
        id="email"
        class="form_input_signup"
      />
      <p class="invalid_input">Email invalide!</p>
      <p class="invalid_input">Votre adresse mail est déjà utilisée.</p>

      <input
        name="password"
        placeholder="Mot de passe"
        id="password"
        class="form_input_signup"
      />
      <p class="invalid_input">
        Min 6 caractères, 1 maj, 1 min, 1 caractère spécial
      </p>

      <input
        type="email"
        name="email"
        placeholder="Adresse mail"
        id="email_login"
        class="form_input_login"
      />

      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        id="password_login"
        class="form_input_login"
      />

      <p class="invalid_input_login">
        L'adresse mail ou le mot de passe est invalide.
      </p>

      <input type="submit" value="S'inscrire" class="form_submit" />
      <input type="submit" value="Se connecter" class="form_submit" />
    </form>
  </div>
</div>;
