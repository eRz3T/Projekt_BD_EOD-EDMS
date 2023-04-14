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
      INSERT INTO users (email, password, first_name, last_name)
      VALUES (?, ?, ?, ?)
      RETURNING *;
    `
    const [user] = await db.raw(sqlQuery, [email, password, first_name, last_name])
    return user
  },
  // Przykład z użyciem ORM, wg założeń możemy max 50% zapytań do bazy zrobić w ORM
  findByEmail: async (email) => {
    const [user] = await db('users').where({ email })
    return user
  },
  getAllUsers: async () => {
    const users = await db('users').select('id', 'email', 'first_name', 'last_name')
    return users
  },
}
