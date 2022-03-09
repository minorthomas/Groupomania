Clonez le projet

Créez une base de données SQL appelée "groupomania", le back se charge de migré les tables dans la BDD.

__FRONT (REACT PROJECT)__  
Dans le fichier frontend:

 __Lancez la console puis collez la ligne suivante pour installer tous les modules:__
 * npm install  
 
 __Créez un fichier nommé ".env" puis collez les lignes suivantes:__
 * REACT_APP_API_URL = http://localhost:3000/
 * PORT = 8080

__Lancez le projet avec la commande:__
* npm start

LIEN POUR SE CONNECTER "http://localhost:8080/profile"

////////////////////////////////////////////////////////////////////////

__BACK (NODE SERVER)__  
Dans le fichier backend:

__Lancez la console puis collez la ligne suivante pour installer tous les modules:__
 * npm install  

__Créez un fichier nommé ".env" puis collez les lignes suivantes:__
* TOKEN_SECRET = sU4PsW4SQebWG0GLtOJkzIQsKMgWENHRPDYZBr2tQdy2GFQCMItcmuskeyOPIkYxgajzRx1U2Ta4q5n9n32P6nJa53mYbr4pmcS0
* DB_HOST = localhost
* DB_USER = root
* DB_PASS = yourpassword (changez par votre password)
* DB_NAME = groupomania
* DB_LANG = mysql
* CLIENT_URL = http://localhost:8080

__Lancez le projet avec la commande:__
* nodemon server
