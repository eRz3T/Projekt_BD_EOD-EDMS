const knex = require('knex')
const config = require('../../knexfile').development
const db = knex(config)

module.exports = {
  createTransition: async (uuid, caseId, fromUserId, toUserId) => {
    const sqlQuery = `
    INSERT INTO case_transitions (id, case_id, from_user_id, to_user_id, created_at)
    VALUES (?, ?, ?, ?, NOW())
    RETURNING *
  `
    const caseTransitionResult = await db.raw(sqlQuery, [uuid, caseId, fromUserId, toUserId])
    return caseTransitionResult.rows[0]
  },
  // Pozostałe metody modelu...
}
