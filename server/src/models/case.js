const knex = require('knex')
const config = require('../../knexfile').development
const db = knex(config)

module.exports = {
  createCase: async (uuid, assignedUserId, createdBy, title, description, expiresAt) => {
    const sqlQuery = `
    INSERT INTO cases (id, assigned_user_id, created_by, title, description, expires_at, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    RETURNING *
  `
    const caseResult = await db.raw(sqlQuery, [
      uuid,
      assignedUserId,
      createdBy,
      title,
      description,
      expiresAt,
    ])
    return caseResult.rows[0]
  },
  updateAssignedUser: async (caseId, assignedUserId) => {
    const sqlQuery = `
    UPDATE cases
    SET assigned_user_id = ?, updated_at = NOW()
    WHERE id = ?
    RETURNING id, assigned_user_id
  `
    const updatedCaseResult = await db.raw(sqlQuery, [assignedUserId, caseId])
    return updatedCaseResult.rows[0]
  },
  getAllUserCases: async (userId) => {
    const sqlQuery = `
    SELECT cases.*, CONCAT(creator.first_name, ' ', creator.last_name) AS created_by_details, CONCAT(assignee.first_name, ' ', assignee.last_name) AS assigned_to_details
    FROM cases
    INNER JOIN appusers AS creator ON cases.created_by = creator.id
    INNER JOIN appusers AS assignee ON cases.assigned_user_id = assignee.id
    WHERE assigned_user_id = ?;
    `
    const userCases = await db.raw(sqlQuery, [userId])
    return userCases.rows
  },
}
