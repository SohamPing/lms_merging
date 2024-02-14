import express from "express"
import path from "path"
import bodyParser from "body-parser"
import ejs from "ejs"
const app = express();


import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDaBRb4kvKkbyzonhe4OgMusvguc0asuaI",
  authDomain: "lmsproject-1f5c0.firebaseapp.com",
  projectId: "lmsproject-1f5c0",
  storageBucket: "lmsproject-1f5c0.appspot.com",
  messagingSenderId: "334848584616",
  appId: "1:334848584616:web:4dbc95b5479edb8093cb9d"
};
const FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(FirebaseApp);
const googleAuth = new GoogleAuthProvider();

const staticPath = path.join(process.cwd(), 'public');
app.use(express.static(staticPath));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes setup

// For example, rendering the login page
app.route("/auth/login")
  .get(function (req,res) {
      res.render('auth/login')})
      .post(function (req,res){
        var email,password;
        email = req.body.loginemail;
        password = req.body.password;
        
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
          res.redirect('/Dashboard/id='+userCredential.user.uid);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          res.send('<center><h2>'+errorMessage+'</h2></center>');
        })
      });


// Route for Google Authentication
app.get('/auth/google', (req, res) => {
  // Redirect the user to Google's authentication page with redirect flow
  signInWithRedirect(auth, googleAuth);
});

// Route for handling Google authentication callback
app.get('/auth/google/login', (req, res) => {
  // Handle the redirect from Google authentication
  getRedirectResult()
    .then((result) => {
      // The signed-in user info.
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      res.redirect('/Dashboard/id=' + user.uid);
    })
    .catch((error) => {
      // Handle errors
      // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

    res.send('<center><h2>' + error.message + '</h2></center>');
    });
});


// Route for account registration
app.route("/auth/register")
  .get(function (req,res) {
    res.render('auth/register')})
    .post(function (req,res){
      var email,password,passwordconfirm;
      email = req.body.loginemail;
      password = req.body.password;
      passwordconfirm = req.body.passwordconfirm;
      if(password.localeCompare(passwordconfirm)) res.send('<center><h2>Passwords do not Match</h2></center>');
      else {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          var user = userCredential.user;
          res.redirect('/Dashboard/id='+userCredential.user.uid);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          res.send('<center><h2>'+errorMessage+'</h2></center>');
        });
      }
    });


      

app.get('/Dashboard', (req, res) => {
  // Send a simple text response
  res.send('Hello, world!');
  });

app.listen(process.env.PORT||3000,function(){
  console.log("Server started on port 3000");
});