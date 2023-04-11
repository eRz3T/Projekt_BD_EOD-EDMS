const express = require('express');
const app = express();
const {pool} = require("./dbConfig");
var path = require('path');
const bcrypt = require ('bcrypt');
const session = require("express-session");
const flash = require("express-flash");
const { request } = require('http');
const passport = require("passport");

const initializePassport = require("./passportConfig");

initializePassport(passport);

const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());



app.get('/', (req, res)=>{
    res.render('index');
});

app.get("/informacje", (req, res) =>{
    res.render("pages/informacje");
});

app.get("/logowanie", checkAuthenticated, (req, res) =>{
    res.render("pages/logowanie");
});

app.get("/rejestracja", checkAuthenticated, (req, res) => {
    res.render("pages/rejestracja");
});

app.get("/uzytkownik/hub", checkNotAuthenticated, (req, res) =>{
    res.render("pages/hub", {user: req.user.name});
});

app.post("/wylogowanie", (req, res) =>{
    req.logout(() => {
        req.flash("success_msg", "Uzytkownik wylogowany");
        res.redirect("/logowanie");
      });
});

app.get("/start", (req, res) =>{
    res.render("index");
});

app.post('/rejestracja', async (req, res) =>{
    let { name, surname, email, password} = req.body;

    console.log({
      name,
      surname,
      email,
      password
    })

    let errors =[];


    if (!name || !surname || !email || !password) {
        errors.push({message: "Wypełnij wszystkie pola !!"});
    }

    if (password.length < 4 ){
    errors.push({message: "Hasło powinno mieć przynajmniej 4 znaki"}); 
    }

    if (errors.length > 0){
        res.render("pages/rejestracja", { errors });
      }else{
//logowanie powodzeniem

      let cryptedpassword = await bcrypt.hash(password, 2);
      console.log(cryptedpassword);

      pool.query(
        `SELECT * FROM appusers 
        WHERE email = $1`, [email] , (err, result) => {
        if(err){
            throw err
        }

        console.log(result.rows);

        if (result.rows.length > 0) {
            errors.push({ message: "Taki email jest już w systemie !!" })
            res.render("pages/rejestracja", { errors });
        }else{
            pool.query(
                `INSERT INTO appusers (name, surname, email, password)
                VALUES ($1, $2, $3, $4)
                RETURNING id, password`, [name, surname, email, password],
                (err,results) => {
                if (err){
                    throw err;
                }
                console.log(results.rows);
                req.flash("success_msg", "Zostałeś zarejestrowany");
                res.redirect("/logowanie");
                }
            )
        }
        }
      )
    }
});

app.post("/logowanie", 
passport.authenticate("local",{
    successRedirect: "/uzytkownik/hub",
    failureRedirect: "/logowanie",
    failureFlash:true
}));

function checkAuthenticated (req, res, next) {
    if (req.isAuthenticated()){
        return res.redirect("/uzytkownik/hub");
    }
    next();
}

function checkNotAuthenticated (req,res,next) {
    if (req.isAuthenticated()){
        return next()
    }


    res.redirect("/logowanie");
}



app.listen(PORT, ()=>{
    console.log(`Serwer na porcie ${PORT}`);
});

app.use(express.static(path.join(__dirname, 'public')));