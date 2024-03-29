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
const PORT = process.env.PORT || 4000;

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

/////////////////////////GETY////////////////////////////


// Obsługa żądania GET na adres główny "/"
// Renderowanie szablonu "welcome.ejs"
app.get("/", (req, res)=>{
    res.render("about/welcome");
});

// Obsługa żądania GET na adres "/users/logowanie"
// Renderowanie szablonu "logowanie.ejs"
app.get("/users/logowanie", (req, res) =>{
    res.render("users/pages-access/logowanie");
});

// Obsługa żądania GET na adres "/users/rejestracja"
// Renderowanie szablonu "rejestracja.ejs"
app.get("/users/rejestracja", checkAuthenticated, (req, res) => {
    res.render("users/pages-access/rejestracja");
});

    app.get("/users/createPath", checkAuthenticated, (req, res) =>{
      res.render("users/cases/eObieg/createPath");
    });

    app.get("/users/pathList", checkAuthenticated, (req, res) => {
      const userId = req.user.id;
      const active = 'active';
    
      pool.query('SELECT * FROM path', (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send("Wystąpił błąd podczas pobierania listy ścieżek.");
          return;
        }
        const paths = results.rows;
    
        pool.query(
          `SELECT jump_path.id_jumpath, path.name_path, casefile.title_case, jump_path.id_jump_jumpath, jump_path.id_case_jumpath
          FROM jump_path
          INNER JOIN casefile ON casefile.id_case = jump_path.id_case_jumpath
          INNER JOIN group_users ON id_group_grpusr = jump_path.id_child_jumpath
          INNER JOIN path ON path.id_path = jump_path.id_way_jumpath
          WHERE id_user_grpusr = $1 AND is_active_jumpath = $2 AND id_owner_jumpath IS NULL;`,
          [userId, active],
          (error, results) => {
            if (error) {
              console.error(error);
              res.status(500).send("Wystąpił błąd podczas pobierania listy spraw.");
              return;
            }
            const FREEcases = results.rows;
    
            pool.query(
              `SELECT jump_path.id_jumpath, path.name_path, casefile.title_case, jump_path.id_jump_jumpath, jump_path.id_case_jumpath
              FROM jump_path
              INNER JOIN casefile ON casefile.id_case = jump_path.id_case_jumpath
              INNER JOIN group_users ON id_group_grpusr = jump_path.id_child_jumpath
              INNER JOIN path ON path.id_path = jump_path.id_way_jumpath
              WHERE id_user_grpusr = $1 AND is_active_jumpath = $2 AND id_owner_jumpath = $1;`,
              [userId, active],
              (error, results) => {
                if (error) {
                  console.error(error);
                  res.status(500).send("Wystąpił błąd podczas pobierania listy spraw.");
                  return;
                }
                const cases = results.rows;
    
                res.render("users/cases/eObieg/pathList", { paths, cases, FREEcases });
              }
            );
          }
        );
      });
    });

    app.get("/users/pathView/:id", checkAuthenticated, (req, res) => {
      const pathId = req.params.id;
    
      pool.query(
        `SELECT groups.name_group
         FROM prefix_path
         JOIN groups ON prefix_path.id_group_patpref = groups.id_group
         WHERE prefix_path.id_prefix_patpref = $1
         ORDER BY prefix_path.id_prefix_patpref`,
        [pathId],
        (error, results) => {
          if (error) {
            throw error;
          }
    
          const groups = results.rows;
    
          pool.query(`SELECT id_path, name_path, opis_path, email FROM path
          INNER JOIN appusers ON appusers.id = path.creator_path
           WHERE id_path = $1`, [pathId], (error, results) => {
            if (error) {
              throw error;
            }
    
            const path = results.rows[0];
    
            res.render("users/cases/eObieg/pathView", { path, groups });
          });
        }
      );
    });
    



    app.get("/users/pathPrefixEdit/:id", checkAuthenticated, (req, res) => {
      const pathId = req.params.id;
    
      pool.query('SELECT * FROM groups', (error, results) => {
        if (error) {
          throw error;
        }
    
        const groups = results.rows;
    
        res.render("users/cases/eObieg/pathPrefixEdit", { groups, path: { id_path: pathId } });
      });
    });

    app.get("/users/eObiegSelection/:id_case", checkAuthenticated, (req, res) => {
      const id_case = req.params.id_case;

      pool.query("SELECT * FROM path", (error, results) => {
        if (error) {
          throw error;
        }
        const paths = results.rows;
        res.render("users/cases/eObieg/eObiegSelection", { paths, id_case });
      });
    });


app.get("/users/nowiczlonkowie/:id", checkAuthenticated, (req, res) => {
  const groupId = req.params.id;
  
  pool.query('SELECT * FROM appusers WHERE status = $1', ['active'], (error, activeResults) => {
    if (error) throw error;
    const users = activeResults.rows.map(row => ({
      id: row.id,
      name: row.name,
      surname: row.surname,
      email: row.email,
      class: row.class
    }));
    res.render("users/groups/userselect", { users,  groupId });
  });
});

app.get("/groupedit/:id", checkAuthenticated, (req, res) => {
  const groupId = req.params.id;

  pool.query(
    `SELECT name_group
     FROM groups WHERE id_group =$1`,
    [groupId],
    (err, result) => {
      if (err) {
        console.error(err);
        if (res.headersSent) { return; }
        res.status(500).send("Wystąpił błąd przy pobieraniu informacji o grupie.");
        return;
      }

      const idgroup = groupId;
      const groupName = result.rows[0].name_group;

      pool.query(
        `SELECT au.id, au.email, au.name, au.surname
         FROM appusers au
         JOIN group_users gu ON au.id = gu.id_user_grpusr
         WHERE gu.id_group_grpusr = $1`,
        [groupId],
        (err, result) => {
          if (err) {
            console.error(err);
            if (res.headersSent) { return; }
            res.status(500).send("Wystąpił błąd przy pobieraniu listy członków grupy.");
            return;
          }

          const members = result.rows;

          res.render("users/groups/groupedit", { groupName: groupName, idgroup: idgroup, members: members });
        }
      );
    }
  );
});

app.get('/groups/grouplist', checkAuthenticated, (req, res) => {
  const userId = req.user.id;

  pool.query('SELECT * FROM groups WHERE creator_group = $1', [userId], (err, result1) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    const groups = result1.rows;

    pool.query('SELECT groups.name_group FROM groups INNER JOIN group_users ON groups.id_group = group_users.id_group_grpusr WHERE group_users.id_user_grpusr = $1', [userId], (err, result2) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      const userGroups = result2.rows;

      res.render('users/groups/grouplist', { groups: groups, userGroups: userGroups });
    });
  });
});

app.get("/users/grupy", checkAuthenticated, (req, res) =>{
  res.render("users/groups/groupcreate");
});

app.get("/users/caselistarchive", checkAuthenticated, (req, res) => {
  const userId = req.user.id;
  const not_active = 'not_active';

  pool.query(
    'SELECT id_case, opis_case, id_group_case, title_case FROM casefile WHERE id_user_case = $1 AND status_case = $2',
    [userId, not_active],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Wystąpił błąd podczas pobierania listy spraw.");
        return;
      }

      const cases = results.rows;

      console.log("listaSprawArchiwalnych");
    res.render("users/cases/caselistArch", { user: req.user.name, cases });

    }
  );
});

app.get("/users/caselist", checkAuthenticated, (req, res) => {
  const userId = req.user.id;

  const active = 'active';

  pool.query(
    'SELECT id_case, opis_case, id_group_case, title_case FROM casefile WHERE id_user_case = $1 AND status_case = $2',
    [userId, active],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Wystąpił błąd podczas pobierania listy spraw.");
        return;
      }

      const cases = results.rows;

      pool.query(
        `SELECT id_case_casusr, title_case FROM case_user 
        INNER JOIN casefile ON case_user.id_case_casusr = casefile.id_case
        WHERE id_user_casusr = $1`,
        [userId],
        (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).send("Wystąpił błąd podczas pobierania informacji o udostępnionych sprawach.");
            return;
          }

          const sharedCasesUSR = results.rows;

          pool.query(
            `SELECT id_case_casgrup, title_case FROM case_group 
            INNER JOIN groups ON case_group.id_group_casgrup = groups.id_group
            INNER JOIN group_users ON groups.id_group = group_users.id_group_grpusr
            INNER JOIN casefile ON case_group.id_case_casgrup = casefile.id_case
            WHERE group_users.id_user_grpusr = $1`,
            [userId],
            (error, results) => {
              if (error) {
                console.error(error);
                res.status(500).send("Wystąpił błąd podczas pobierania informacji o udostępnionych sprawach.");
                return;
              }
    
              const sharedCasesGROUP = results.rows;

          res.render("users/cases/caselist", { user: req.user.name, cases, sharedCasesUSR, sharedCasesGROUP });
          console.log("listaSpraw");
         }
        );
        }
      );
    }
  );
});

app.get("/users/caseView/:id", checkAuthenticated, (req, res) => {
      const caseId = req.params.id;
        // Fetch the case data and the documents assigned to it from the database based on its ID
        pool.query(`SELECT casefile.id_case, casefile.title_case, casefile.opis_case
        FROM casefile 
        WHERE casefile.id_case = $1`, [caseId], (err, result) => {
          if (err) {
            console.log(err);
            res.redirect('/users/cases');
          } else {
            const caseData = result.rows;


        pool.query(`SELECT casefile.id_case, casefile.title_case, casefile.opis_case, documents.id_document, documents.title_document 
        FROM casefile 
        INNER JOIN case_documents ON casefile.id_case = case_documents.id_case_casdoc
        INNER JOIN documents ON case_documents.id_document_casdoc = documents.id_document
        WHERE casefile.id_case = $1`, [caseId], (err, result) => {
          if (err) {
            console.log(err);
            res.redirect('/users/cases');
          } else {
            const caseDataDocs = result.rows;
            console.log(caseData)
            console.log(caseDataDocs)
            res.render("users/cases/caseView", { caseData, caseDataDocs });
          }
        });
    }
  });
});

app.get("/users/caseVieweObieg/:caseId/:idjumpath", checkAuthenticated, (req, res) => {
  const caseId = req.params.caseId;
  const idjumpath = req.params.idjumpath;

  pool.query(
    `SELECT casefile.id_case, casefile.title_case, casefile.opis_case, documents.id_document, documents.title_document 
    FROM casefile 
    INNER JOIN case_documents ON casefile.id_case = case_documents.id_case_casdoc
    INNER JOIN documents ON case_documents.id_document_casdoc = documents.id_document
    INNER JOIN jump_path ON casefile.id_case = jump_path.id_case_jumpath
    WHERE jump_path.id_jumpath = $1`, 
    [idjumpath], 
    (err, result) => {
      if (err) {
        console.log(err);
        res.redirect('/users/cases');
      } else {
        const caseData = result.rows;

        const userId = req.user.id;
        const active = 'active';

        console.log(userId);
        console.log(active);
        console.log(caseId);
        console.log(idjumpath);

        pool.query(
          `SELECT jump_path.id_case_jumpath, casefile.id_group_case, casefile.title_case, path.id_path, jump_path.id_jump_jumpath, jump_path.id_jumpath
          FROM casefile 
          INNER JOIN case_path ON case_path.id_case_caspat = casefile.id_case
          INNER JOIN path ON path.id_path = case_path.id_path_caspat 
          INNER JOIN jump_path ON jump_path.id_way_jumpath = path.id_path
          INNER JOIN group_users ON group_users.id_group_grpusr = jump_path.id_child_jumpath
          WHERE casefile.id_user_case = $1 AND casefile.status_case = $2 AND jump_path.is_active_jumpath = $2 AND group_users.id_user_grpusr = $1 AND jump_path.id_jumpath = $3`,
          [userId, active, idjumpath],
          (error, results) => {
            if (error) {
              console.error(error);
              res.status(500).send("Wystąpił błąd podczas pobierania listy spraw.");
              return;
            }
            const cases = results.rows;

            res.render("users/cases/eObieg/caseVieweObieg", { caseData, cases });
          }
        );
      }
    }
  );
});

app.get("/users/caseform",checkAuthenticated, (req, res)=>{ 
  res.render("users/cases/caseform", {user: req.user.name});
  console.log("formularzSprawy") 
});

app.get("/users/docselect/:id", checkAuthenticated, (req, res) => {
  const userId = req.user.id;

  pool.query(
    `SELECT documents.id_document, documents.title_document, documents.note_document
     FROM documents
     INNER JOIN document_owner ON documents.id_document = document_owner.id_document_docown 
     WHERE document_owner.id_user_docown = $1  `,
    [userId],
    (err, result) => {
      if (err) {
        console.error(err);
        if (res.headersSent) { return; }
        res.status(500).send("Wystąpił błąd przy pobieraniu dokumentów.");
        return;
      }

      if (result.rows.length === 0) {
        res.render("users/cases/docselect", { documents: [] });
        return;
      }
      res.render("users/cases/docselect", { documents: result.rows, caseId: req.params.id });
    }
  );
});

app.get("/users/share/caseshareGROUP/:id", checkAuthenticated, (req, res) => {
  pool.query(
    `SELECT id_group, name_group FROM groups`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Wystąpił błąd przy pobieraniu grup.");
        return;
      }

      const groups = result.rows;
      console.log("Przesył sprawy grupie") 
      res.render("users/cases/share/caseshareGROUP", { groups, id: req.params.id });
    }
  );
});

app.get("/users/share/caseshareUSER/:id", checkAuthenticated, (req, res) => {
  pool.query(
    `SELECT email, id FROM appusers`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Wystąpił błąd przy pobieraniu użytkowników.");
        return;
      }

      const emails = result.rows;
      console.log("Przesył sprawy użytkownikowi");
      res.render("users/cases/share/caseshareUSER", { emails, id: req.params.id });
    }
  );
});

app.get("/users/caseView/:id", checkAuthenticated, (req, res) => {
  res.render("users/cases/caseView");
  console.log("Podgląd sprawy") 
});

//checkNotAuthenticated
// Obsługa żądania GET na adres "/users/userPanel"
// Przekazanie funkcji pośredniczącej "checkNotAuthenticated"
// Renderowanie szablonu "userPanel.ejs"
// Przekazanie obiektu z właściwością "user", która zawiera nazwę użytkownika
app.get("/users/userPanel", checkAuthenticated, (req, res) => {
  const userId = req.user.id; // pobranie ID logującego się użytkownika

  pool.query('SELECT id, name, surname, email, class FROM appusers WHERE id = $1 AND status = $2', [userId, 'active'], (error, results) => {
    if (error) throw error;
    const users = results.rows[0];

    res.render("users/userPanel", {user: req.user.name, users});
    console.log("panel użytkownika");
  });
});

app.get('/users/edit_user/:id', checkAuthenticated, (req, res) => {
  const userId = req.params.id;

  pool.query('SELECT * FROM appusers WHERE id = $1', [userId], (err, userResult) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    if (userResult.rows.length === 0) {
      res.sendStatus(404);
      return;
    }

    const user = userResult.rows[0];

    pool.query('SELECT * FROM groups', (err, groupsResult) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      const groups = groupsResult.rows;

      res.render('users/editUser', { userId: userId, userData: user, groups: groups });
    });
  });
});


// Obsługa żądania GET na adres "/users/uploads"
// Renderowanie szablonu "uploads.ejs"
app.get("/users/uploads",checkAuthenticated, (req, res)=>{ 
    res.render("users/pages-uploads/uploads", {user: req.user.name});
    console.log("panel upload") 
});

app.get("/users/userlist", checkAuthenticated, (req, res) => {
  pool.query('SELECT * FROM appusers WHERE status = $1', ['active'], (error, activeResults) => {
    if (error) throw error;
    const users = activeResults.rows.map(row => ({
      id: row.id,
      name: row.name,
      surname: row.surname,
      email: row.email,
      class: row.class
    }));

    pool.query('SELECT * FROM appusers WHERE status = $1', ['not_active'], (error, inactiveResults) => {
      if (error) throw error;
      const not_users = inactiveResults.rows.map(row => ({
        id: row.id,
        name: row.name,
        surname: row.surname,
        email: row.email,
        class: row.class
      }));

      let index = 0;
      let indexB = 0;
      res.render("users/userlist", { users, not_users, index, indexB });
      console.log("Lista użytkowników");
    });
  });
});

app.get("/users/docsend/:id", checkAuthenticated, (req, res) => {
  const documentId = req.params.id;
  
  pool.query(
    `SELECT email FROM appusers`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Wystąpił błąd przy pobieraniu użytkowników.");
        return;
      }

      const emails = result.rows.map(row => row.email);

      res.render("users/document-flow/docsend", { documentId, emails });
    }
  );
});

app.get("/users/doclists", checkAuthenticated, (req, res) => {
  const userId = req.user.id;
  
  pool.query(
    `SELECT documents.id_document, documents.title_document, documents.note_document
     FROM documents
     INNER JOIN document_owner ON documents.id_document = document_owner.id_document_docown 
     WHERE document_owner.id_user_docown = $1  `,
    [userId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Wystąpił błąd przy pobieraniu dokumentów.");
        return;
      }

      if (result.rows.length === 0) {
        res.render("users/document-flow/doclist", { documents: [] });
        return;
      }
      res.render("users/document-flow/doclist", { documents: result.rows });
    }
  );
});

app.get("/users/document/:id", checkAuthenticated, (req, res) => {
  const userId = req.user.id;
  const documentId = req.params.id;
  // Fetch the document from the database based on its ID

  pool.query(`SELECT documents.id_document, documents.title_document, documents.note_document, documents.date_document, documents.id_file_document, files.name_file
  FROM documents 
  INNER JOIN document_owner ON documents.id_document = document_owner.id_document_docown
  INNER JOIN file_owner ON document_owner.id_user_docown = file_owner.id_user_filown
  INNER JOIN files ON file_owner.id_file_filown = files.id_file 
  WHERE documents.id_document = $1 AND documents.id_file_document = files.id_file`, [documentId], (err, result) => {
    if (err) {
      console.log(err);
      res.redirect('/users/documents');
    } else {
      // Render the document.ejs template and pass the fetched document data to it
      res.render("users/document-flow/document", { document: result.rows[0] });
    }
  });
});

app.get("/users/docform", checkAuthenticated, (req, res) => {
  const userId = req.user.id;

  pool.query(
    `SELECT files.id_file, files.name_file 
     FROM files
     INNER JOIN file_owner ON files.id_file = file_owner.id_file_filown
     INNER JOIN appusers ON file_owner.id_user_filown = appusers.id
     WHERE appusers.id = $1`,
    [userId],
    (err, result) => {
      if (err) throw err;

      const files = result.rows;
      res.render('users/document-flow/docform', { userId, files });
    }
  );
});

// Route do wyświetlenia listy plików użytkownika
app.get("/users/filelist", checkAuthenticated, (req, res) => {
  const userId = req.user.id;
  // Pobranie plików użytkownika z bazy danych
  pool.query(
    `SELECT files.id_file, files.name_file , files.hashed_name_file
     FROM files
     INNER JOIN file_owner ON files.id_file = file_owner.id_file_filown
     INNER JOIN appusers ON file_owner.id_user_filown = appusers.id
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
    `SELECT * FROM files WHERE hashed_name_file = $1`,
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





/////////////////////////POSTY////////////////////////////

app.post("/eObieg/own/:id_jumpath", checkAuthenticated, (req, res) => {
  const jumpathId = req.params.id_jumpath;
  const userId = req.user.id;

  pool.query(
    'UPDATE jump_path SET id_owner_jumpath = $2 WHERE id_jumpath = $1',
    [jumpathId, userId],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).send("Wystąpił błąd podczas przypisywania właściciela.");
        return;
      }

      res.redirect("/users/pathList");
    }
  );
});



app.post('/eObieg/reject/:id_jump_jumpath/:id_path/:id_jumpath/:id_case', checkAuthenticated, async (req, res) => {
  try {
    const idJumpPrefixPath = req.params.id_jump_jumpath;
    const idPath = req.params.id_path;
    const idJumpath = req.params.id_jumpath;
    const idCase = req.params.id_case;
    
    console.log("WARTOŚCI Z URL");
    console.log("OBECNY NR KROKU: " + idJumpPrefixPath);
    console.log("ID KONKRETNEJ ŚCIEŻKI Z TABELI PATH: " + idPath);
    console.log("ID KONKRETNEGO REKORDU Z TABELI JUMP_PATH: " + idJumpath);
    console.log("ID SPRAWY: " + idCase);

    await pool.query(
      'UPDATE jump_path SET is_active_jumpath = $1 WHERE id_jumpath = $2',
      ['not_active', idJumpath]
    );

    await pool.query(
      'INSERT INTO caseflow_end (id_case_casfend, id_jumpath_casfend, status_casfend) VALUES ($1, $2, $3)',
      [idCase, idJumpath , 'Odrzucono' ]      
    );
    
    return res.redirect('/users/pathList');
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred');
  }
});





app.post('/eObieg/forward/:id_jump_jumpath/:id_path/:id_jumpath/:id_case', checkAuthenticated, async (req, res) => {
 
  try {

// ID Z TABELI JUMP_PATH KTÓRE ODNOSI SIĘ DO TABELI PREFIX_PATH
// SĄ TU PRZETRZYMYWANE WARTOŚCI OBECNEGO KROKU 
    const idJumpPrefixPath = req.params.id_jump_jumpath; 


          // ID KONKRETNEJ ŚCIEŻKI Z TABELI PATH
              const idPath = req.params.id_path; 


                  // ID KONKRETNEGO SKOKU Z TABELI JUMP_PATH
                      const idJumpath = req.params.id_jumpath; 


                              // ID SPRAWY Z TABELI CASEFILE
                                  const idCase = req.params.id_case; 
                                  console.log("WARTOŚCI Z URL");
                                  console.log("OBECNY NR KROKU: " + idJumpPrefixPath);
                                  console.log("ID KONKRETNEJ ŚCIEŻKI Z TABELI PATH: " + idPath);
                                  console.log("ID KONKRETNEGO REKORDU Z TABELI JUMP_PATH: " + idJumpath);
                                  console.log("ID SPRAWY: " + idCase);

// WYLICZENIE NASTĘNEGO KROKU W ODNIESIENIU DO TABELI PREFIX PATH
// KONKRETNIE DO KOLUMNY STEP_NUMBER_PATPREF KTÓRA INFORMUJE W KTORYM KROKU DANEJ ŚCIEZKI JESTEŚMY
// WYLICZENIE NASTĘPNEJ WARTOŚCI POZWOLI NA PRZYDZIELENIE NASTĘNEJ GR KTÓREJ ZOSTANIE PRZYDZIELONA SPRAWA
    const nextjump = parseInt(idJumpPrefixPath) + 1;  
    console.log("INASTĘPNY KROK: " + nextjump);

console.log("ETAP A");
///BEGIN A
   // SPRAWDZENIE MAX ILOŚCI KROKÓW W DANEJ ŚCIEŻCE
   // JESLI  nextjump JEST WIĘKSZY NIŻ maxStepNumber
   // TO SPRAWA TRAFIA DO ARCHIWIZACJI
   // else >> OBLICZANY JEST KOLEJNY KROK + POZOSTAŁE OPERACJE
    const groupMAXResult = await pool.query(
      'SELECT MAX(step_number_patpref) AS max FROM prefix_path WHERE id_prefix_patpref = $1',
      [idPath]
    );

      const maxStepNumber = groupMAXResult.rows[0].max;
      console.log("MAKSYMALNA ILOŚĆ KROKÓW W TEJ ŚĆIEŻCE: " + maxStepNumber);

        if (maxStepNumber < nextjump) {
          await pool.query(
            'UPDATE jump_path SET is_active_jumpath = $1 WHERE id_jumpath = $2',
            ['not_active', idJumpath] 
          );

          await pool.query(
            'INSERT INTO caseflow_end (id_case_casfend, id_jumpath_casfend, status_casfend) VALUES ($1, $2, $3)',
            [idCase, idJumpath , 'Zaakceptowano' ]      
          );

          return res.redirect('/users/pathList');
  
    }     else      {
      //END A


console.log("ETAP B");
//BEGIN B
      // POBRANIE INFORMACJI NA TEMAT NASTĘPNEJ GR KTÓREJ MA BYĆ PRZYDZIELONA SPRAWA
      const groupResult = await pool.query(
        'SELECT id_group_patpref FROM prefix_path WHERE id_prefix_patpref = $1 AND step_number_patpref = $2',
        [idPath, nextjump]
      );

            if (groupResult.rows.length === 0) {
              return res.status(400).json({ message: 'Nieprawidłowe dane' });
            }


            const idGroupPatpref = groupResult.rows[0].id_group_patpref;
            console.log("ID NASTĘPNEJ GRUPY: " + idGroupPatpref);
//END B


console.log("ETAP C");
//BEGIN C
// POBRANIE WARTOŚCI Z TABELI JUMP PATH
// INFORMACJA NA TEMAT AKTUALNEJ GRUPY KTÓREJ W POPRZEDNIM KROKU JEST JEST PRZYDZIELANA SPRAWA W POPRZEDNIM KROKU
// OPERACJA TA JEST WYKONYWANA W CELU PRZYDZIELENIA TEJ WARTOŚCI KOLUMNIE PARENT
// WARTOŚĆ CHILD STAJE SIĘ RODZICEM NASTĘPNEGO KROKU A NOWYM DZIECKIEM JEST GRUPA KTÓRA AKTUALNIE MA PRZYDZIELONĄ SPRAWĘ
          const childResult = await pool.query(
            'SELECT id_child_jumpath FROM jump_path WHERE id_jumpath = $1 AND id_jump_jumpath = $2',
            [idJumpath, idJumpPrefixPath]
          );
                  if (childResult.rows.length === 0) {
                    return res.status(400).json({ message: 'Nieprawidłowe dane' });
                  }
              const idPrefixPatpref = childResult.rows[0].id_child_jumpath;
              console.log("ID PARENTA (CHILD Z POPRZEDNIEGO KROKU): " + idGroupPatpref);
//END C

console.log("ETAP D");
//BEGIN D
// WPISYWANIE DO TABELI JUMP_PATH INFORMACJI O NOWYM KROKU / ETAPIE OBIEGU SPRAWY
// id_way_jumpath < tu jest wpisywana informacja na temat danej ścieżki wokół której wykonywany jest obieg sprawy (ID_PATH z tabeli PATH)
//                  dla każdego kolejnego przeskoku w tej sprawie będzie wpisywana ta sama wartość do końca obiegu (jedna sprawa ta jest w jednej ścieżce)
// id_child_jumpath <  wartość z tabeli prefix_path (kolumna id_group_patpref) kprzekazująca informacje której grupie aktualnie jest przydzialana dana sprawa
// id_parent_jumpath < wartość z poprzedniego kroku z tabeli prefix_path (kolumna id_group_patpref), oznacza jaki był child w poprzednim kroku
// is_active_jumpath < flaga która w obeznym kroku wskazuje 'active', w przypadku przejścia do następnego kroku jest zmieniana na 'not_active' (na jej podstawie są wyświetlane sprawy)
// id_jump_jumpath < nr krku w którym jest dana sprawa (przykładowo jeśli jesteśmy na 3 etapie z 8 w danej ścieżce będzie tu wartość 3)
// id_case_jumpath < id sprawy która jest w obiegu
console.log("wPISYWANE WARTOĆICI DO W RAMACH NASTĘPNEGO KROKU DO KOLUMNY - id_way_jumpath - idPath - " + idPath);
console.log("wPISYWANE WARTOĆICI DO W RAMACH NASTĘPNEGO KROKU DO KOLUMNY - id_child_jumpath - idGroupPatpref - " + idGroupPatpref);
console.log("wPISYWANE WARTOĆICI DO W RAMACH NASTĘPNEGO KROKU DO KOLUMNY - id_parent_jumpath - idPrefixPatpref - " + idPrefixPatpref);
console.log("wPISYWANE WARTOĆICI DO W RAMACH NASTĘPNEGO KROKU DO KOLUMNY - is_active_jumpath - ACTIVE");
console.log("wPISYWANE WARTOĆICI DO W RAMACH NASTĘPNEGO KROKU DO KOLUMNY - id_jump_jumpath - nextjump - " + nextjump);
console.log("wPISYWANE WARTOĆICI DO W RAMACH NASTĘPNEGO KROKU DO KOLUMNY - id_case_jumpath - idCase - " + idCase);
              await pool.query(
                'INSERT INTO jump_path (id_way_jumpath, id_child_jumpath, id_parent_jumpath, is_active_jumpath, id_jump_jumpath, id_case_jumpath) VALUES ($1, $2, $3, $4, $5, $6)',
                [idPath, idGroupPatpref, idPrefixPatpref, 'active', nextjump, idCase]
              );
              //END D

              console.log("ZAMIANA NA NOT_ACTIVE W KROKU Z ID: idJumpath -" + idJumpath);
                  // zmiana w poprzednim kroku statusu na not active 
                  // jeśli sprawa przechodzi do następnego kroku grupa z poprzedniego etapu nie powinna mieć dostępu do tej sprawy
                  await pool.query(
                    'UPDATE jump_path SET is_active_jumpath = $1 WHERE id_jumpath = $2',
                    ['not_active', idJumpath]
                  );



          res.redirect('/users/pathList');
        }
  } 
    catch (err)

    {
        console.error(err);
        res.status(500).json({ message: 'Wystąpił błąd serwera' });
    }

});






app.post('/eObieg/backward/:id_jump_jumpath/:id_path/:id_jumpath/:id_case', checkAuthenticated, async (req, res) => {
 
  try {

// ID Z TABELI JUMP_PATH KTÓRE ODNOSI SIĘ DO TABELI PREFIX_PATH
// SĄ TU PRZETRZYMYWANE WARTOŚCI OBECNEGO KROKU 
    const idJumpPrefixPath = req.params.id_jump_jumpath; 


          // ID KONKRETNEJ ŚCIEŻKI Z TABELI PATH
              const idPath = req.params.id_path; 


                  // ID KONKRETNEGO SKOKU Z TABELI JUMP_PATH
                      const idJumpath = req.params.id_jumpath; 


                              // ID SPRAWY Z TABELI CASEFILE
                                  const idCase = req.params.id_case; 
                                  console.log("WARTOŚCI Z URL");
                                  console.log("OBECNY NR KROKU: " + idJumpPrefixPath);
                                  console.log("ID KONKRETNEJ ŚCIEŻKI Z TABELI PATH: " + idPath);
                                  console.log("ID KONKRETNEGO REKORDU Z TABELI JUMP_PATH: " + idJumpath);
                                  console.log("ID SPRAWY: " + idCase);

// WYLICZENIE NASTĘNEGO KROKU W ODNIESIENIU DO TABELI PREFIX PATH
// KONKRETNIE DO KOLUMNY STEP_NUMBER_PATPREF KTÓRA INFORMUJE W KTORYM KROKU DANEJ ŚCIEZKI JESTEŚMY
// WYLICZENIE NASTĘPNEJ WARTOŚCI POZWOLI NA PRZYDZIELENIE NASTĘNEJ GR KTÓREJ ZOSTANIE PRZYDZIELONA SPRAWA
    const prevjump = parseInt(idJumpPrefixPath) - 1;  
    console.log("INASTĘPNY KROK: " + prevjump);

console.log("ETAP A");
///BEGIN A
   // SPRAWDZENIE MAX ILOŚCI KROKÓW W DANEJ ŚCIEŻCE
   // JESLI  nextjump JEST WIĘKSZY NIŻ maxStepNumber
   // TO SPRAWA TRAFIA DO ARCHIWIZACJI
   // else >> OBLICZANY JEST KOLEJNY KROK + POZOSTAŁE OPERACJE
    const groupMINResult = await pool.query(
      'SELECT MIN(step_number_patpref) AS max FROM prefix_path WHERE id_prefix_patpref = $1',
      [idPath]
    );

      const minStepNumber = groupMINResult.rows[0].max;

        if (minStepNumber > prevjump) {
          await pool.query(
            'UPDATE jump_path SET is_active_jumpath = $1 WHERE id_jumpath = $2',
            ['not_active', idJumpath]
          );


          await pool.query(
            'INSERT INTO caseflow_end (id_case_casfend, id_jumpath_casfend, status_casfend) VALUES ($1, $2, $3)',
            [idCase, idJumpath , 'Odrzucono' ]      
          );

          return res.redirect('/users/pathList');
  
    }     else      {
      //END A


console.log("ETAP B");
//BEGIN B
      // POBRANIE INFORMACJI NA TEMAT NASTĘPNEJ GR KTÓREJ MA BYĆ PRZYDZIELONA SPRAWA
      const groupResult = await pool.query(
        'SELECT id_group_patpref FROM prefix_path WHERE id_prefix_patpref = $1 AND step_number_patpref = $2',
        [idPath, prevjump]
      );

            if (groupResult.rows.length === 0) {
              return res.status(400).json({ message: 'Nieprawidłowe dane' });
            }

            const idGroupPatpref = groupResult.rows[0].id_group_patpref;
            console.log("ID NASTĘPNEJ GRUPY: " + idGroupPatpref);
//END B


console.log("ETAP C");
//BEGIN C
// POBRANIE WARTOŚCI Z TABELI JUMP PATH
// INFORMACJA NA TEMAT AKTUALNEJ GRUPY KTÓREJ W POPRZEDNIM KROKU JEST JEST PRZYDZIELANA SPRAWA W POPRZEDNIM KROKU
// OPERACJA TA JEST WYKONYWANA W CELU PRZYDZIELENIA TEJ WARTOŚCI KOLUMNIE PARENT
// WARTOŚĆ CHILD STAJE SIĘ RODZICEM NASTĘPNEGO KROKU A NOWYM DZIECKIEM JEST GRUPA KTÓRA AKTUALNIE MA PRZYDZIELONĄ SPRAWĘ
          const childResult = await pool.query(
            'SELECT id_child_jumpath FROM jump_path WHERE id_jumpath = $1 AND id_jump_jumpath = $2',
            [idJumpath, idJumpPrefixPath]
          );
                  if (childResult.rows.length === 0) {
                    return res.status(400).json({ message: 'Nieprawidłowe dane' });
                  }
              const idPrefixPatpref = childResult.rows[0].id_child_jumpath;
              console.log("ID PARENTA (CHILD Z POPRZEDNIEGO KROKU): " + idGroupPatpref);
//END C

console.log("ETAP D");
//BEGIN D
// WPISYWANIE DO TABELI JUMP_PATH INFORMACJI O NOWYM KROKU / ETAPIE OBIEGU SPRAWY
// id_way_jumpath < tu jest wpisywana informacja na temat danej ścieżki wokół której wykonywany jest obieg sprawy (ID_PATH z tabeli PATH)
//                  dla każdego kolejnego przeskoku w tej sprawie będzie wpisywana ta sama wartość do końca obiegu (jedna sprawa ta jest w jednej ścieżce)
// id_child_jumpath <  wartość z tabeli prefix_path (kolumna id_group_patpref) kprzekazująca informacje której grupie aktualnie jest przydzialana dana sprawa
// id_parent_jumpath < wartość z poprzedniego kroku z tabeli prefix_path (kolumna id_group_patpref), oznacza jaki był child w poprzednim kroku
// is_active_jumpath < flaga która w obeznym kroku wskazuje 'active', w przypadku przejścia do następnego kroku jest zmieniana na 'not_active' (na jej podstawie są wyświetlane sprawy)
// id_jump_jumpath < nr krku w którym jest dana sprawa (przykładowo jeśli jesteśmy na 3 etapie z 8 w danej ścieżce będzie tu wartość 3)
// id_case_jumpath < id sprawy która jest w obiegu
console.log("wPISYWANE WARTOĆICI DO W RAMACH NASTĘPNEGO KROKU DO KOLUMNY - id_way_jumpath - idPath - " + idPath);
console.log("wPISYWANE WARTOĆICI DO W RAMACH NASTĘPNEGO KROKU DO KOLUMNY - id_child_jumpath - idGroupPatpref - " + idGroupPatpref);
console.log("wPISYWANE WARTOĆICI DO W RAMACH NASTĘPNEGO KROKU DO KOLUMNY - id_parent_jumpath - idPrefixPatpref - " + idPrefixPatpref);
console.log("wPISYWANE WARTOĆICI DO W RAMACH NASTĘPNEGO KROKU DO KOLUMNY - is_active_jumpath - ACTIVE");
console.log("wPISYWANE WARTOĆICI DO W RAMACH NASTĘPNEGO KROKU DO KOLUMNY - id_jump_jumpath - nextjump - " + prevjump);
console.log("wPISYWANE WARTOĆICI DO W RAMACH NASTĘPNEGO KROKU DO KOLUMNY - id_case_jumpath - idCase - " + idCase);
              await pool.query(
                'INSERT INTO jump_path (id_way_jumpath, id_child_jumpath, id_parent_jumpath, is_active_jumpath, id_jump_jumpath, id_case_jumpath) VALUES ($1, $2, $3, $4, $5, $6)',
                [idPath, idGroupPatpref, idPrefixPatpref, 'active', prevjump, idCase]
              );
              //END D

              console.log("ZAMIANA NA NOT_ACTIVE W KROKU Z ID: idJumpath -" + idJumpath);
                  // zmiana w poprzednim kroku statusu na not active 
                  // jeśli sprawa przechodzi do następnego kroku grupa z poprzedniego etapu nie powinna mieć dostępu do tej sprawy
                  await pool.query(
                    'UPDATE jump_path SET is_active_jumpath = $1 WHERE id_jumpath = $2',
                    ['not_active', idJumpath]
                  );



          res.redirect('/users/pathList');
        }
  } 
    catch (err)

    {
        console.error(err);
        res.status(500).json({ message: 'Wystąpił błąd serwera' });
    }

});


app.post('/users/processEObiegSelection/:id_case', checkAuthenticated, (req, res) => {
  const selectedPathId = req.body.selectedPath;
  const caseId = req.params.id_case;


  pool.query(
    `SELECT name_path
     FROM path
     WHERE id_path = $1`,
    [selectedPathId],
    (error, results) => {
      if (error) {
        throw error;
      }

      const selectedPathName = results.rows[0].name_path;

   
      pool.query(
        `SELECT prefix_path.id_group_patpref
         FROM prefix_path
         INNER JOIN path ON path.id_path = prefix_path.id_prefix_patpref
         WHERE prefix_path.step_number_patpref = 1 AND path.name_path LIKE $1`,
        [selectedPathName],
        (error, results) => {
          if (error) {
            throw error;
          }

          const prefixPathId = results.rows[0].id_group_patpref;

        
          pool.query(
            `INSERT INTO jump_path (id_way_jumpath, id_child_jumpath, id_parent_jumpath, is_active_jumpath, id_jump_jumpath, id_case_jumpath )
             VALUES ($1, $2, NULL, 'active', 1, $3)`,
            [selectedPathId, prefixPathId, caseId],
            (error, results) => {
              if (error) {
                throw error;
              }

              console.log('Data inserted into jump_path table');

           
              pool.query(
                `INSERT INTO case_path (id_case_caspat, id_path_caspat)
                 VALUES ($1, $2)`,
                [caseId, selectedPathId],
                (error, results) => {
                  if (error) {
                    throw error;
                  }

                  console.log('Data inserted into case_path table');

              
                  res.redirect(`/users/caselist`);
                }
              );
            }
          );
        }
      );
    }
  );
});

app.post("/users/savePathPrefix/:id", checkAuthenticated, (req, res) => {
  const pathId = req.params.id;
  const groupId = req.body.id_group_patpref;

  pool.query(
    `SELECT COALESCE(MAX(step_number_patpref), 0) + 1 AS next_step_number
     FROM prefix_path
     WHERE id_prefix_patpref = $1`,
    [pathId],
    (error, results) => {
      if (error) {
        throw error;
      }

      const nextStepNumber = results.rows[0].next_step_number;

      pool.query(
        `INSERT INTO prefix_path (id_prefix_patpref, id_group_patpref, step_number_patpref)
         VALUES ($1, $2, $3)`,
        [pathId, groupId, nextStepNumber],
        (error, results) => {
          if (error) {
            throw error;
          }

          console.log(`Utworzono nowy skok dla ścieżki ${pathId} z numerem ${nextStepNumber}`);
          req.flash('success_msg', 'Nowy skok został utworzony.');
          res.redirect("/users/pathView/" + pathId);
        }
      );
    }
  );
});


app.post('/paths/create', (req, res) => {
  const { name_path, opis_path } = req.body;
  const creator_path = req.user.id; 

  pool.query(
    `INSERT INTO path (name_path, creator_path, opis_path)
     VALUES ($1, $2, $3)`,
    [name_path, creator_path, opis_path],
    (error, results) => {
      if (error) {
        throw error;
      }

      console.log(`Utworzono nową ścieżkę o nazwie ${name_path}`);

      req.flash('success_msg', 'Nowa ścieżka została utworzona.');
      res.redirect('/users/pathList');
    }
  );
});



app.post('/users/share/caseshareGROUP/:id', checkAuthenticated, (req, res) => {
  const id_case_casgrup = req.params.id;
  const id_group_casgrup = req.body.group;

  pool.query(
    `INSERT INTO case_group (id_case_casgrup, id_group_casgrup) VALUES ($1, $2)`,
    [id_case_casgrup, id_group_casgrup],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Wystąpił błąd podczas udostępniania sprawy.");
        return;
      }

      console.log("Sprawa udostępniona grupie.");
      res.redirect('/users/caselist');
    }
  );
});

app.post('/users/share/caseshareUSER/:id', checkAuthenticated, (req, res) => {
  const id_case_casusr = req.params.id;
  const id_user_casusr = req.body.email;

  pool.query(
    `INSERT INTO case_user (id_case_casusr, id_user_casusr) VALUES ($1, $2)`,
    [id_case_casusr, id_user_casusr],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Wystąpił błąd podczas udostępniania sprawy.");
        return;
      }

      console.log("Sprawa udostępniona użytkownikowi.");
      res.redirect('/users/caselist');
    }
  );
});

app.post('/groupUSRdelete/:id', checkAuthenticated, (req, res) => {
  const userId = req.params.id;
  const groupId = req.body.groupId;
console.log(userId, groupId);
  pool.query(
    `DELETE FROM group_users
     WHERE id_user_grpusr = $1 AND id_group_grpusr = $2`,
    [userId, groupId],
    (err, result) => {
      if (err) {
        console.error(err);
        if (res.headersSent) { return; }
        res.status(500).send('Wystąpił błąd podczas usuwania członka grupy.');
        return;
      }

      res.redirect(`/groupedit/${groupId}`);
    }
  );
});

app.post('/groupUpdateName/:id', checkAuthenticated, (req, res) => {
  const groupId = req.params.id;
  const groupName = req.body.groupName;

  // Aktualizacja nazwy grupy
  pool.query(
    `UPDATE groups SET name_group = $1 WHERE id_group = $2`,
    [groupName, groupId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Wystąpił błąd przy aktualizacji nazwy grupy.");
        return;
      } else {
        req.flash('success_msg', 'Zmieniono nazwę grupy');
        res.redirect(`/groupedit/${groupId}`);
      }
    }
  );
});

// Dodanie nowej grupy do bazy danych
app.post('/groups/create', (req, res) => {
  const { name_group } = req.body;
  const userId = req.user.id;

  pool.query(
    `INSERT INTO groups (name_group, creator_group)
     VALUES ($1, $2)`,
    [name_group, userId],
    (error, results) => {
      if (error) {
        throw error;
      }

      console.log(`Utworzono grupę o nazwie ${name_group}`);

      req.flash('success_msg', 'Grupa została utworzona.');
      res.redirect('/users/userPanel');
    },
  );
});

app.post("/dodaj-do-sprawy/:caseId", checkAuthenticated, (req, res) => {
  const caseId = req.params.caseId;
  const selectedDocuments = req.body.documents;

  // Insert the selected documents into the case_documents table
  selectedDocuments.forEach(documentId => {
    pool.query(
      `INSERT INTO case_documents (id_case_casdoc, id_document_casdoc) VALUES ($1, $2)`,
      [caseId, documentId],
      (err, result) => {
        if (err) {
          console.error(err);
          if (res.headersSent) { return; }
          res.status(500).send("Wystąpił błąd przy dodawaniu dokumentów do sprawy.");
          return;
        }
      }
    );
  });

  res.redirect("/users/caselist");
});

app.post("/dodaj-do-grupy/:groupId", checkAuthenticated, (req, res) => {
  const groupId = req.params.groupId;
  let selectedUsers = req.body.user_id;

  if (!Array.isArray(selectedUsers)) {
    selectedUsers = [selectedUsers];
  }

  selectedUsers.forEach(user_Id => {
    pool.query(
      `INSERT INTO group_users (id_user_grpusr, id_group_grpusr) VALUES ($1, $2)`,
      [user_Id, groupId],
      (err, result) => {
        if (err) {
          console.error(err);
          if (res.headersSent) { return; }
          res.status(500).send("Wystąpił błąd przy dodawaniu użytkowników do grupy.");
          return;
        }
      }
    );
  });

  // Add delay and then redirect
  setTimeout(() => {
    req.flash('success_msg', 'Dodano nowych użytkowników !!');
    res.redirect(`/groupedit/${groupId}`);
  }, 500);
});

app.post("/users/caseform", checkAuthenticated, (req, res) => {
  const title = req.body.nazwaSprawy;
  const description = req.body.note;
  const userId = req.user.id;

  pool.query(
    `INSERT INTO casefile (title_case, opis_case, id_user_case) VALUES ($1, $2, $3)`,
    [title, description, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Wystąpił błąd przy dodawaniu sprawy.");
        return;
      }

      res.redirect("/users/caselist");
    }
  );
});

app.post('/users/edit_user/:id', checkAuthenticated, (req, res) => {
  const userId = req.params.id;

  const { name, surname, email, password, userClass, groupId } = req.body;

  pool.query(
    'UPDATE appusers SET name = $1, surname = $2, email = $3, password = $4, class = $5 WHERE id = $6',
    [name, surname, email, password, userClass, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      // Dodanie użytkownika do grupy
      if (groupId) {
        pool.query(
          `INSERT INTO group_users (id_group_grpusr, id_user_grpusr)
           VALUES ($1, $2)`,
          [groupId, userId],
          (error, results) => {
            if (error) {
              console.error(error);
              res.sendStatus(500);
              return;
            }

            console.log(`Dodano użytkownika ${userId} do grupy ${groupId}`);
          }
        );
      } else {
        console.log(`Nie wybrano grupy dla użytkownika ${userId}`);
      }

      res.redirect('/users/userlist');
    }
  );
});

app.post('/case/UNDOdelete_case/:id', checkAuthenticated, (req, res) => {
  const CaseId = req.params.id;
  
  pool.query(
    `UPDATE casefile SET status_case = 'active' WHERE id_case = $1`,
    [CaseId],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Wystąpił błąd podczas przywracania sprawy");
      }
      
      res.redirect('/users/caselist');
    }
  );

});

app.post('/case/delete_case/:id', checkAuthenticated, (req, res) => {
  const CaseId = req.params.id;
  
      
      pool.query(
        `UPDATE casefile SET status_case = 'not_active' WHERE id_case = $1`,
        [CaseId],
        (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Wystąpił błąd podczas usuwania sprawy");
          }
          
          res.redirect('/users/caselist');
        }
     );
});

app.post('/users/UNDOdelete_user/:id', checkAuthenticated, (req, res) => {
  const userId = req.params.id;
  const dateArch = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
  pool.query(
    `UPDATE appusers SET status = 'active' WHERE id = $1`,
    [userId],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Wystąpił błąd podczas przywracania użytkownika");
      }
      
      res.redirect('/users/userlist');
    }
  );

});

app.post('/users/delete_user/:id', checkAuthenticated, (req, res) => {
  const userId = req.params.id;
  const dateArch = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
  pool.query(
    `INSERT INTO users_archive_del (id_user_arch_usrarchdel, date_arch_usrarchdel) VALUES ($1, $2)`,
    [userId, dateArch],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Wystąpił błąd podczas archiwizowania użytkownika");
      }
      
      pool.query(
        `UPDATE appusers SET status = 'not_active' WHERE id = $1`,
        [userId],
        (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Wystąpił błąd podczas usuwania użytkownika");
          }
          
          res.redirect('/users/userlist');
        }
      );
    }
  );
});


app.post("/users/docsend/:id", checkAuthenticated, (req, res) => {
  const documentId = req.params.id;
  const email = req.body.email;

  // Check if the document exists
  pool.query(
    `SELECT id_file_document FROM documents WHERE id_document = $1`,
    [documentId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Wystąpił błąd przy pobieraniu dokumentu.");
        return;
      }

      if (result.rows.length === 0) {
        res.status(400).send("Nie znaleziono dokumentu o podanym ID.");
        return;
      }

      const fileId = result.rows[0].id_file_document;

      // Check if the user exists
      pool.query(
        `SELECT id FROM appusers WHERE email = $1`,
        [email],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Wystąpił błąd przy pobieraniu użytkownika.");
            return;
          }

          if (result.rows.length === 0) {
            res.status(400).send("Nie znaleziono użytkownika o podanym adresie email.");
            return;
          }

          const userId = result.rows[0].id;

          // Assign the document to the user
          pool.query(
            `INSERT INTO document_owner (id_document_docown, id_user_docown) VALUES ($1, $2)`,
            [documentId, userId],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).send("Wystąpił błąd przy przypisywaniu dokumentu do użytkownika.");
                return;
              }

                  // Redirect to the document list page
                  req.flash('success_msg', 'Plik został przesłany');
                  res.redirect("/users/doclists");
                
            }
          );
        }
      );
    }
  );
});

app.post('/users/delete/:id', checkAuthenticated, (req, res) => {
  const hashedfilename = req.params.id;

  pool.query(
    `SELECT id_file FROM files WHERE hashed_name_file = $1`,
    [hashedfilename],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Wystąpił błąd podczas pobierania id pliku");
      }
      
      const fileId = result.rows[0].id_file;
      console.log(fileId);
  
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
          const archivePath = path.join(__dirname, 'uploads', 'ARCHIWUM-DEL', fileName);
          const filePath = path.join(__dirname, 'uploads', fileName); // Dodajemy definicję filePath

          // Skopiowanie pliku do katalogu archiwum
          fs.copyFile(filePath, archivePath, (err) => {
            if (err) {
              console.log(err);
              return res.status(500).send("Wystąpił błąd podczas usuwania pliku");
            }

            pool.query( 
              `DELETE FROM file_owner WHERE id_file_filown = $1`,
              [fileId],
              (err) => {
                if (err) {
                  console.log(err);
                  return res.status(500).send("Wystąpił błąd podczas usuwania pliku");
                }

                const userId = req.user.id_user;
                const dateArch = new Date().toISOString().slice(0, 19).replace('T', ' ');

                pool.query(
                  `INSERT INTO file_archive_del (id_user_arch_filarchdel, date_arch_filarchdel, id_file_filarchdel) 
                   VALUES ($1, $2, $3)`,
                  [req.user.id, dateArch, fileId],
                  (err) => {
                    if (err) {
                      console.log(err);
                      return res.status(500).send("Wystąpił błąd podczas usuwania pliku");
                    }

                    res.redirect('/users/filelist');
                  }
                );
              }
            );
          });
        }
      );
    }
  );
});



app.post('/documents', checkAuthenticated, (req, res) => {
  const { document_title, note, file_id } = req.body;
  const date = new Date().toISOString();

  pool.query(

    `INSERT INTO documents (title_document, note_document, date_document, id_file_document)
     VALUES ($1, $2, $3, $4)
     RETURNING id_document`,
    [document_title, note, date, file_id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Wystąpił błąd podczas dodawania dokumentu");
      }
      const id_document = result.rows[0].id_document;
      req.flash("success_msg", "Dokument w systemie");

      pool.query(
        `INSERT INTO document_owner (id_document_docown, id_user_docown)
         VALUES ($1, $2)`,
        [id_document, req.user.id],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Wystąpił błąd podczas dodawania dokumentu");
          }
          res.redirect("/users/doclists");
        }
      );
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
  return res.redirect("/users/filelist");
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
        return res.redirect("/users/filelist");
      } else {
        const fileId = result.rows[0].id_file;
        // Dodanie rekordu do tabeli file_owner, uwzględniając id użytkownika i id przesłanego pliku
        client.query(
          "INSERT INTO file_owner (id_user_filown, id_file_filown) VALUES ($1, $2)",
          [req.user.id, fileId],
          (err, result) => {
            done(); // zwolnienie klienta
            if (err) {
              console.log(err);
              req.flash('error_msg', 'Błąd bazy danych');
            } else {
              console.log("Plik został pomyślnie przesłany i dodany do bazy danych, a informacje o nim zostały dodane do tabeli file_owner");
              req.flash('success_msg', 'Plik został przesłany do systemu');
            }
            // Przekierowanie użytkownika do panelu użytkownika po przesłaniu pliku
            res.redirect("/users/filelist");
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
                console.log("Nowy uzytkownik w bazie") 
                req.flash("success_msg", "Został dodany nowy użytkowwnik!");
                res.redirect("/users/userlist");
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
    const userId = req.user.id;
    pool.query('SELECT status FROM appusers WHERE id = $1', [req.user.id], (error, results) => {
      if (error) throw error;
      const userStatus = results.rows[0].status;
      if (userStatus === 'active') {
        return next();
      }
      req.flash('error_msg', 'Konto nie jest aktywne');
      res.redirect("/users/logowanie");
    });
  } else {
    req.flash('error_msg', 'Błąd bazy danych');
    res.redirect("/users/logowanie");
  }
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