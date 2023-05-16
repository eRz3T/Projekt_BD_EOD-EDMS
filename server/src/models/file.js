const knex = require('knex')
const config = require('../../knexfile').development
const db = knex(config)

module.exports = {
  uploadFile: async (uuid, caseId, userId, filename) => {
    const sqlQuery = `
    INSERT INTO files (id, case_id, user_id, filename, created_at)
    VALUES (?, ?, ?, ?, NOW())
    RETURNING *
  `
    const fileResult = await db.raw(sqlQuery, [uuid, caseId, userId, filename])
    return fileResult.rows[0]
  },
  getFileById: async (fileId) => {
    const sqlQuery = `
    SELECT * FROM files WHERE id = ?;
    `
    const fileResult = await db.raw(sqlQuery, [fileId])
    return fileResult.rows[0]
  },
  getFilesByCaseId: async (caseId) => {
    const sqlQuery = `
    SELECT * FROM files WHERE case_id = ?;
    `
    const filesResult = await db.raw(sqlQuery, [caseId])
    return filesResult.rows
  },
}
