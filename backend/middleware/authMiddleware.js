const jwt = require("jsonwebtoken");
const { User } = require("../models");

// module.exports.checkUser = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
//       if (error) {
//         res.locals.user = null;
//         res.cookie("jwt", "", { maxAge: 1 });
//         next();
//       } else {
//         let user = await User.findByPk(decodedToken.id);
//         res.locals.user = user;
//         next();
//       }
//     });
//   } else {
//     res.locals.user = null;
//     next();
//   }
// };

// module.exports.requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("User id: " + decodedToken.id);
//         next();
//       }
//     });
//   } else {
//     console.log("No token");
//   }
// };

module.exports.auth = (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1]; // Récupération du token dans le header dans un tableau split et on retourne le 2ème élément //
    console.log(token);
    const decodedToken = jwt.verify(token, "TOKEN_SECRET"); // On décode le token, la clé doit correspondre à celle de la fontion login //
    console.log(decodedToken);
    const userId = decodedToken.id; // On récupére l'userId //
    console.log(userId);
    req.decodedToken = decodedToken;
    if (req.body.id && req.body.id !== userId) {
      // Si l'userId du corps de la requête est différent de userId //
      throw "User ID non valable"; // Throw pour renvoyer l'erreur //
    } else {
      next(); // Tout est ok donc, on passe au prochain middleware //
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
