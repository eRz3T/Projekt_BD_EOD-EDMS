// Import bibliotek i modułów
const LocalStrategy = require ("passport-local").Strategy; // Import lokalnej strategii uwierzytelniania
const { authenticate } = require("passport"); // Import modułu passport do uwierzytelniania
const {pool} = require("./dbConfig"); // Import połączenia z bazą danych
const bcrypt = require("bcrypt"); // Import biblioteki do hashowania hasła

// Funkcja inicjalizująca passport
function initialize (passport) {
    
    // Funkcja uwierzytelniająca użytkownika
    const authenticateUser = (email, password, done) => {
        pool.query(
            `SELECT id, name, surname, email, password, class FROM appusers WHERE email = $1`, // Zapytanie do bazy danych
            [email], // Parametr zapytania
        (err, results) => { // Callback obsługujący wyniki zapytania
            if (err) // W przypadku błędu
            {
                 throw err; // Rzuć wyjątek
            }
        console.log(results.rows); // Wyświetl wyniki zapytania w konsoli
            if (results.rows.length > 0) { // Jeśli wyniki istnieją
            const user = results.rows[0]; // Przypisz pierwszy wynik do zmiennej user
                if (password === user.password) { // Jeśli hasło pasuje
                    return done(null, user); // Zwróć użytkownika
                        } else {
                        return done(null, false, { message: "Złe hasło" }); // Zwróć błąd, jeśli hasło nie pasuje
                        }
                    } else {
                return done(null, false, { message: "Email nie jest zarejestrowany !!" }); // Zwróć błąd, jeśli użytkownik o podanym adresie email nie istnieje
            }});
        };

    // Dodaj lokalną strategię uwierzytelniania
    passport.use(new LocalStrategy({
        usernameField: "email", // Pole email w formularzu
        passwordField: "password" // Pole hasła w formularzu
    },
    authenticateUser // Funkcja uwierzytelniająca użytkownika
    )
    );

    // Serializuj użytkownika
    passport.serializeUser((user, done)=> done(null, user.id));

    // Deserializuj użytkownika
    passport.deserializeUser((id, done) => {
        pool.query(`SELECT * FROM appusers WHERE id = $1`, [id], (err, results) => { // Zapytanie do bazy danych
          if (err) { // W przypadku błędu
            throw err; // Rzuć wyjątek
          }
          return done(null, results.rows[0]); // Zwróć użytkownika
        });
      });
}

// Eksportuj funkcję inicjalizującą passport
module.exports = initialize;