// express: moduł frameworka webowego do obsługi żądań HTTP
const express = require("express");
const app = express();
// pool: obiekt bazy danych z konfiguracją połączenia, importowany z pliku dbConfig.js
const {pool} = require("./dbConfig");
// path: moduł Node.js umożliwiający łatwe operacje na ścieżkach plików i katalogów
const path = require("path");
// bcrypt: moduł umożliwiający hashowanie hasła użytkownika przed zapisaniem go do bazy danych
const bcrypt = require ("bcrypt");
// session: moduł umożliwiający przechowywanie sesji użytkownika
const session = require("express-session");
// flash: moduł umożliwiający wyświetlanie komunikatów na stronie internetowej, np. błędów uwierzytelniania
const flash = require("express-flash");
const { request } = require("http");
// passport: moduł umożliwiający uwierzytelnianie użytkowników
const passport = require("passport");
// initializePassport: funkcja, która inicjalizuje konfigurację uwierzytelniania w Passport.js
const initializePassport = require("./passportConfig");
const fs = require('fs');
const crypto = require('crypto');
process.env.NLS_LANG = 'POLISH_POLAND.UTF8';

initializePassport(passport);


//Pliki wykonujące
// Import kodu z uploads.js
const uploadModule = require("./uploads");
const upload = uploadModule.upload;

// PORT: zmienna środowiskowa przechowująca numer portu aplikacji lub 4000, jeśli nie jest określona
const PORT = process.env.PORT || 5000;


//ustawienie silnika szablonów ejs dla aplikacji.
app.set("view engine", "ejs");
//umożliwienie parsowania danych przesłanych za pomocą metody POST z formularzy
app.use(express.urlencoded({ extended: true }));
//możliwienie parsowania danych przesłanych za pomocą metody POST z nagłówkiem application/json.
app.use(express.json());



//konfiguracja mechanizmu sesji dla aplikacji, gdzie:
app.use(session({
    //secret - tajny klucz, który będzie używany do podpisywania i weryfikacji ciasteczek sesji.
    secret: 'secret',
    //resave - określa, czy sesja ma być zapisywana do magazynu sesji podczas każdego 
    // żądania, nawet jeśli nie została zmodyfikowana.
    resave: false,
    //saveUninitialized - określa, czy ma być tworzona nowa sesja, gdy ta jeszcze nie istnieje.
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000 // ustaw maksymalny czas życia ciasteczka sesji na 1 godzinę
    }
}));

// app.use(passport.initialize()); - ustawia funkcję passport.initialize() 
// jako pośrednika dla każdego żądania obsługiwanego przez serwer. Ta funkcja
//  inicjalizuje Passport i konfiguruje aplikację zgodnie z wymaganiami uwierzytelnienia.

app.use(passport.initialize());

// app.use(passport.session()); - ustawia funkcję passport.session() 
// jako pośrednika dla każdego żądania obsługiwanego przez serwer. 
// Ta funkcja dodaje obsługę sesji do Passporta i pozwala na przechowywanie 
// stanu uwierzytelnienia między żądaniami.

app.use(passport.session());

// app.use(flash()); - ustawia funkcję flash() jako pośrednika 
// dla każdego żądania obsługiwanego przez serwer. Ta funkcja 
// dodaje funkcjonalność wiadomości Flash do aplikacji, co 
// pozwala na przechowywanie i wyświetlanie informacji dla użytkowników 
// w odpowiedzi na ich interakcje z serwerem.

app.use(flash());


// Obsługa żądania GET na adres główny "/"
// Renderowanie szablonu "welcome.ejs"
app.get("/", (req, res)=>{
    res.render("about/welcome");
});

// Obsługa żądania GET na adres "/about/informacje"
// Renderowanie szablonu "informacje.ejs"
app.get("/about/informacje", (req, res) =>{
    res.render("about/informacje");
});


// Obsługa żądania GET na adres "/users/logowanie"
// Renderowanie szablonu "logowanie.ejs"
app.get("/users/logowanie", (req, res) =>{
    res.render("users/pages-access/logowanie");
});


// Obsługa żądania GET na adres "/users/rejestracja"
// Renderowanie szablonu "rejestracja.ejs"
app.get("/users/rejestracja", (req, res) => {
    res.render("users/pages-access/rejestracja");
});

//checkNotAuthenticated
// Obsługa żądania GET na adres "/users/userPanel"
// Przekazanie funkcji pośredniczącej "checkNotAuthenticated"
// Renderowanie szablonu "userPanel.ejs"
// Przekazanie obiektu z właściwością "user", która zawiera nazwę użytkownika
app.get("/users/userPanel", checkNotAuthenticated, (req, res) =>{
    res.render("users/userPanel", {user: req.user.name});
    console.log("panel uzytkownika") 
});

// Obsługa żądania GET na adres "/users/uploads"
// Renderowanie szablonu "uploads.ejs"
app.get("/users/uploads",checkAuthenticated, (req, res)=>{ 
    res.render("users/pages-uploads/uploads", {user: req.user.name});
    console.log("panel upload") 
});

// Route do wyświetlenia listy plików użytkownika
app.get("/users/filelist", checkAuthenticated, (req, res) => {
  const userId = req.user.id;
  // Pobranie plików użytkownika z bazy danych
  pool.query(
    `SELECT files.id_file, files.name_file
     FROM files
     INNER JOIN owners ON files.id_file = owners.id_file
     INNER JOIN appusers ON owners.id_user = appusers.id
     WHERE appusers.id = $1`,
    [userId],
    (err, result) => {
      // Obsługa błędów zapytania
      if (err) throw err;
      // Renderowanie widoku listy plików użytkownika
      res.render("users/pages-uploads/filelist", { files: result.rows });
    }
  );
});


// Route do pobierania pliku
app.get('/users/download/:id', checkAuthenticated, (req, res) => {
  const fileId = req.params.id;
  // Pobranie informacji o pliku z bazy danych
  pool.query(
    `SELECT * FROM files WHERE id_file = $1`,
    [fileId],
    (err, result) => {
      // Obsługa błędów zapytania
      if (err) {
        console.log(err);
        return res.status(500).send("Wystąpił błąd podczas pobierania pliku");
      }
      // Odczytanie nazwy pliku i nazwy oryginalnej
      const fileName = result.rows[0].hashed_name_file;
      const originalFileName = result.rows[0].name_file;
      // Konstrukcja ścieżki pliku
      const filePath = path.join(__dirname, 'uploads', fileName);
      // Konstrukcja ścieżki pliku w folderze BUFOR
      const bufferPath = path.join(__dirname, 'uploads', 'BUFOR', fileName);
      // Skopiowanie pliku do folderu BUFOR
      fs.copyFile(filePath, bufferPath, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Wystąpił błąd podczas pobierania pliku");
        }
        // Zmiana nazwy skopiowanego pliku na oryginalną
        fs.rename(bufferPath, path.join(__dirname, 'uploads', 'BUFOR', originalFileName), (err) => {
          if (err) {
            console.log(err);
          }
          // Wysłanie pliku do klienta
          res.download(filePath, originalFileName, (err) => {
            if (err) {
              console.log(err);
              return res.status(500).send("Wystąpił błąd podczas pobierania pliku");
            }
            // Usunięcie skopiowanego pliku z folderu BUFOR
            fs.unlink(path.join(__dirname, 'uploads', 'BUFOR', originalFileName), (err) => {
              if (err) {
                console.log(err);
              }
            });
          });
        });
      });
    }
  );
});


app.post('/users/delete/:id', checkAuthenticated, (req, res) => {
  const fileId = req.params.id;
  pool.query(
    `SELECT * FROM files WHERE id_file = $1`,
    [fileId],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Wystąpił błąd podczas usuwania pliku");
      }
      if (result.rows.length === 0) {
        return res.status(404).send("Nie znaleziono pliku o podanym identyfikatorze");
      }
      const fileName = result.rows[0].hashed_name_file;
      const originalFileName = result.rows[0].name_file;
      const filePath = path.join(__dirname, 'uploads', fileName);
      const archivePath = path.join(__dirname, 'uploads', 'ARCHIWUM-DEL', originalFileName);
      fs.copyFile(filePath, archivePath, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Wystąpił błąd podczas usuwania pliku");
        }
        pool.query(
          `DELETE FROM owners WHERE id_file = $1`,
          [fileId],
          (err) => {
            if (err) {
              console.log(err);
              return res.status(500).send("Wystąpił błąd podczas usuwania pliku");
            }
            const userId = req.user.id_user;
            const dateArch = new Date().toISOString().slice(0, 19).replace('T', ' ');
            pool.query(
              `INSERT INTO file_archive_del (id_user_arch, date_arch, file_id) VALUES ($1, $2, $3)`,
              [req.user.id, dateArch, fileId],
              (err) => {
                if (err) {
                  console.log(err);
                  return res.status(500).send("Wystąpił błąd podczas usuwania pliku");
                }
                fs.unlink(filePath, (err) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).send("Wystąpił błąd podczas usuwania pliku");
                  }
                  res.redirect('/users/filelist');
                });
              }
            );
          }
        );
      });
    }
  );
});


// Obsługa żądania POST na adres "/wylogowanie"
// Wylogowanie użytkownika
// Wyświetlenie komunikatu flash "Uzytkownik wylogowany"
// Przekierowanie na stronę logowania
app.post("/wylogowanie", (req, res) =>{
    req.logout(() => {
        req.flash("success_msg", "Uzytkownik wylogowany");
        res.redirect("/users/logowanie");
      });
    console.log("wylogowano uzytkownika")
});

app.post("/users/uploads", upload.single('image'), (req, res) => {
  // Jeśli plik został przesłany pomyślnie
  if (req.file) {
  pool.connect((err, client, done) => {
  if (err) {
  console.log(err);
  req.flash('error_msg', 'Błąd bazy danych');
  return res.redirect("/users/userPanel");
  }
  // Zapisanie oryginalnej nazwy pliku do zmiennej
  const fileName = req.file.originalname;
  // Wygenerowanie hasha z oryginalnej nazwy pliku
  const hash = crypto.createHash('sha256').update(fileName).digest('hex');
  // Pobranie informacji o przesłanym pliku
  const fileExtension = path.extname(fileName).toLowerCase();
  const fileSize = req.file.size;
  const uploadTimestamp = new Date().toISOString();
  const originalFileName = fileName.replace(/.[^/.]+$/, "");
  // Dodanie hasha jako nazwy pliku do tabeli files i pobranie przydzielonego mu id
  client.query(
    "INSERT INTO files (name_file, hashed_name_file, upload_timestamp, size_file, type_file) VALUES ($1, $2, $3, $4, $5) RETURNING id_file",
    [originalFileName, req.hashedFileName, uploadTimestamp, fileSize, fileExtension],
    (err, result) => {
      if (err) {
        done(); // zwolnienie klienta
        console.log(err);
        req.flash('error_msg', 'Błąd bazy danych');
        return res.redirect("/users/userPanel");
      } else {
        const fileId = result.rows[0].id_file;
        // Dodanie rekordu do tabeli owners, uwzględniając id użytkownika i id przesłanego pliku
        client.query(
          "INSERT INTO owners (id_user, id_file) VALUES ($1, $2)",
          [req.user.id, fileId],
          (err, result) => {
            done(); // zwolnienie klienta
            if (err) {
              console.log(err);
              req.flash('error_msg', 'Błąd bazy danych');
            } else {
              console.log("Plik został pomyślnie przesłany i dodany do bazy danych, a informacje o nim zostały dodane do tabeli owners");
              req.flash('success_msg', 'Plik został przesłany do systemu');
            }
            // Przekierowanie użytkownika do panelu użytkownika po przesłaniu pliku
            res.redirect("/users/userPanel");
          }
        );
      }
    }
  );
});
}
 else 
{
  console.log("nie udało się przesłać pliku")
  req.flash('error_msg', 'Nie udało się przesłać pliku');
  // Przekierowanie użytkownika z powrotem do formularza
  res.redirect("/users/userPanel");
}
});



// Tworzymy nowego użytkownika i dodajemy go do bazy danych
app.post('/users/rejestracja', async (req, res) => {
    let { name, surname, email, password } = req.body;
    console.log({
      name,
      surname,
      email,
      password
    })
    let errors = [];
  
    // Walidacja formularza
    if (!name || !surname || !email || !password) {
      errors.push({ message: "Wypełnij wszystkie pola !!" });
    }
    if (password.length < 4) {
      errors.push({ message: "Hasło powinno mieć przynajmniej 4 znaki" });
    }
  
    // Wyświetlenie błędów lub dodanie użytkownika do bazy danych
    if (errors.length > 0) {
      res.render("users/pages-access/rejestracja", { errors });
    } else {
      // Szyfrowanie hasła
      let cryptedpassword = await bcrypt.hash(password, 2);
      console.log(cryptedpassword);
  
      // Sprawdzenie, czy email użytkownika już istnieje w bazie danych
      pool.query(
        `SELECT * FROM appusers 
        WHERE email = $1`, [email], (err, result) => {
          if (err) {
            throw err
          }
          console.log(result.rows);
          if (result.rows.length > 0) {
            errors.push({ message: "Taki email jest już w systemie !!" })
            res.render("users/pages-access/rejestracja", { errors });
          } else {
            // Dodanie użytkownika do bazy danych
            pool.query(
              `INSERT INTO appusers (name, surname, email, password)
                VALUES ($1, $2, $3, $4)
                RETURNING id, password`, [name, surname, email, password],
              (err, results) => {
                if (err) {
                  throw err;
                }
                console.log(results.rows);
                console.log("nowy uzytkownik w bazie") 
                req.flash("success_msg", "Zostałeś zarejestrowany");
                res.redirect("/users/logowanie");
              })
          }}
      )}
  });

  

// Jest to funkcja obsługująca żądanie POST na adres "/users/logowanie", 
// która korzysta z funkcjonalności autentykacji paszportowej Passport.js.
// Jeśli uwierzytelnienie jest udane, przekierowuje użytkownika na stronę 
// "/users/userPanel", a w przypadku niepowodzenia przekierowuje z powrotem 
// na stronę logowania "/users/logowanie" z włączoną opcją "failureFlash".

app.post("/users/logowanie", 
passport.authenticate("local",{
    successRedirect: "/users/userPanel",
    failureRedirect: "/users/logowanie",
    failureFlash:true
}));


// Jest to funkcja pośrednicząca, która sprawdza, czy użytkownik jest 
// uwierzytelniony. Jeśli tak, przekierowuje go na stronę "/users/userPanel",
// a jeśli nie, przekazuje żądanie dalej za pomocą funkcji next().

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } 
    res.redirect("/users/logowanie");
  }


// Jest to funkcja pośrednicząca, która sprawdza, czy użytkownik 
// jest nieuwierzytelniony. Jeśli tak, przekazuje żądanie dalej 
// za pomocą funkcji next(), a jeśli nie, przekierowuje użytkownika 
// z powrotem na stronę logowania "/users/logowanie".

function checkNotAuthenticated (req,res,next) {
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect("/users/logowanie");
}


// Jest to funkcja, która nasłuchuje żądań HTTP na określonym porcie
// i wyświetla komunikat w konsoli po uruchomieniu aplikacji.

app.listen(PORT, ()=>{
    console.log(`Serwer na porcie ${PORT}`);
});


// Jest to funkcja, która umożliwia dostęp do plików statycznych 
// z folderu "public", które są przechowywane na serwerze i są 
// udostępniane klientowi, aby można było wyświetlić je w przeglądarce.
app.use(express.static(path.join(__dirname, 'public')));