const knex = require('knex')
const config = require('../../knexfile').development
const db = knex(config)

// Ogólnie z folderu 'models' budujemy zapytania do bazy danych
// każdy model ma swoją nazwę i kontekst np.: ten nazywa się 'user' dotyczy tabeli 'users'
// wszystkie poniższe metody dotyczą tylko zapytań względem tej tabeli...

module.exports = {
  // Poniżej przykład zapytania do bazy z użyciem zwykłego SQL (raw sql)
  // pytajniki w values to wartości wrzucone przez użytkownika
  createUser: async (email, password, first_name, last_name) => {
    const sqlQuery = `
      INSERT INTO appusers (email, password, first_name, last_name)
      VALUES (?, ?, ?, ?)
      RETURNING *;
    `
    const [user] = await db.raw(sqlQuery, [email, password, first_name, last_name])
    return user
  },
  // Przykład z użyciem ORM, wg założeń możemy max 50% zapytań do bazy zrobić w ORM
  findByEmail: async (email) => {
    const [user] = await db('appusers').where({ email })
    return user
  },
  getAllUsers: async () => {
    const users = await db('appusers').select('id', 'email', 'first_name', 'last_name')
    return users
  },
  // jak widać na dole zamiast `$1` używamy `?` w celu wprowadzenia parametrów, np.: `userId`
  getUsersDoclists: async (userId) => {
    const sqlQuery = `
      SELECT documents.id_document, documents.title_document, documents.note_document, files.name_file
      FROM documents
      INNER JOIN files ON documents.id_file_document = files.id_file 
      INNER JOIN file_owner ON files.id_file = file_owner.id_file_filown
      WHERE file_owner.id_user_filown = ?;
    `
    const result = await db.raw(sqlQuery, [userId])
    return result.rows
  },
}
