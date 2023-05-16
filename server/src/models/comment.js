const knex = require('knex')
const config = require('../../knexfile').development
const db = knex(config)

module.exports = {
  createComment: async (uuid, caseId, userId, content) => {
    const sqlQuery = `
    INSERT INTO comments (id, case_id, user_id, content, created_at)
    VALUES (?, ?, ?, ?, NOW())
    RETURNING *
  `
    const commentResult = await db.raw(sqlQuery, [uuid, caseId, userId, content])
    return commentResult.rows[0]
  },
  getCaseComments: async (caseId) => {
    const sqlQuery = `
    SELECT comments.id, comments.case_id, comments.user_id, comments.content, comments.created_at, comments.updated_at, files.id as file_id, files.filename, CONCAT(appusers.first_name, ' ', appusers.last_name) AS created_by_details
    FROM comments
    INNER JOIN appusers ON comments.user_id = appusers.id
    LEFT JOIN files ON comments.file_id = files.id
    WHERE comments.case_id = ?;
    `
    const comments = await db.raw(sqlQuery, [caseId])
    return comments.rows
  },
  linkCommentToFile: async (commentId, fileId) => {
    const sqlQuery = `
    UPDATE comments
    SET file_id = ?
    WHERE id = ?
    `
    const comments = await db.raw(sqlQuery, [fileId, commentId])
    return comments.rows
  },
}
