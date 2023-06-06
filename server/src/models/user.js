const knex = require('knex')
const config = require('../../knexfile').development
const db = knex(config)

// Ogólnie z folderu 'models' budujemy zapytania do bazy danych
// każdy model ma swoją nazwę i kontekst np.: ten nazywa się 'user' dotyczy tabeli 'users'
// wszystkie poniższe metody dotyczą tylko zapytań względem tej tabeli...

module.exports = {
  // Poniżej przykład zapytania do bazy z użyciem zwykłego SQL (raw sql)
  // pytajniki w values to wartości wrzucone przez użytkownika
  createUser: async (uuid, email, password, first_name, last_name) => {
    const sqlQuery = `
      INSERT INTO appusers (id, email, password, first_name, last_name)
      VALUES (?, ?, ?, ?, ?)
      RETURNING *;
    `
    const user = await db.raw(sqlQuery, [uuid, email, password, first_name, last_name])
    return user.rows[0]
  },
  updateUser: async (id, email, password, first_name, last_name) => {
    const sqlQuery = `
  UPDATE appusers 
  SET email = ?, password = ?, first_name = ?, last_name = ?
  WHERE id = ?
  RETURNING *;
`
    const user = await db.raw(sqlQuery, [email, password, first_name, last_name, id])
    return user.rows[0]
  },
  // Przykład z użyciem ORM, wg założeń możemy max 50% zapytań do bazy zrobić w ORM
  findByEmail: async (email) => {
    const [user] = await db('appusers').where({ email })
    return user
  },
  getAllUsers: async () => {
    const users = await db('appusers').select(
      'id',
      'email',
      'first_name',
      'last_name',
      'created_at',
      'role'
    )
    return users
  },
  deleteUser: async (userId) => {
    const sqlQuery = `
      DELETE FROM appusers
      WHERE id = ?
    `
    return await db.raw(sqlQuery, [userId])
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
  getActiveCases: async (userId) => {
    const sqlQuery = `
      SELECT cases.*, workflow_steps.id as active_workflow_step_id, previous_workflow_steps.id as previous_step_id, CONCAT(appusers.first_name, ' ', appusers.last_name) as created_by_details
      FROM cases
      INNER JOIN appusers ON cases.created_by = appusers.id
      INNER JOIN case_workflow_steps ON case_workflow_steps.case_id = cases.id
      INNER JOIN workflow_steps ON case_workflow_steps.workflow_step_id = workflow_steps.id
      LEFT JOIN workflow_steps previous_workflow_steps ON workflow_steps.previous_step = previous_workflow_steps.id
      LEFT JOIN case_workflow_steps previous_case_workflow_steps ON previous_case_workflow_steps.case_id = cases.id AND previous_case_workflow_steps.workflow_step_id = previous_workflow_steps.id
      WHERE workflow_steps.user_id = ? AND case_workflow_steps.is_completed = FALSE AND (previous_case_workflow_steps.is_completed = TRUE OR previous_case_workflow_steps.id IS NULL)
    `
    const result = await db.raw(sqlQuery, [userId])
    return result.rows
  },
}
