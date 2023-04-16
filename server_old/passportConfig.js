const LocalStrategy = require ("passport-local").Strategy;
const { authenticate } = require("passport");
const {pool} = require("./dbConfig");
const bcrypt = require("bcrypt");



function initialize (passport) {
    const authenticateUser = (email, password, done) => {
        pool.query(
            `SELECT id, name, surname, email, password, class FROM appusers WHERE email = $1`,
            [email],
        (err, results) => {
            if (err) 
            {
                 throw err;
            }
        console.log(results.rows);
            if (results.rows.length > 0) {
            const user = results.rows[0];
                if (password === user.password) { 
                    return done(null, user);
                        } else {
                        return done(null, false, { message: "Password is not correct" });
                        }
                    } else {
                return done(null, false, { message: "Email nie jest zarejestrowany !!" });
            }});
        };

    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    },
    authenticateUser 
    )
    );


    passport.serializeUser((user, done)=> done(null, user.id));

    passport.deserializeUser((id, done) => {
        pool.query(`SELECT * FROM appusers WHERE id = $1`, [id], (err, results) => {
          if (err) {
            throw err;
          }
          return done(null, results.rows[0]);
        });
      });
}

module.exports = initialize;