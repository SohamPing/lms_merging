import express from "express"
import path from "path"
import bodyParser from "body-parser"
import ejs from "ejs"
const app = express();


import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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

const staticPath = path.join(process.cwd(), 'public');
app.use(express.static(staticPath));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes setup
// For example, rendering the login page
app.route("/login")
        .get(function (req,res) {
            res.render('login')})
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

app.get('/Dashboard', (req, res) => {
    // Send a simple text response
    res.send('Hello, world!');
  });

app.listen(process.env.PORT||3000,function(){
    console.log("Server started on port 3000");
});