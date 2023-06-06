const knex = require('knex')
const config = require('../../knexfile').development
const db = knex(config)

module.exports = {
  createWorkflow: async (uuid, name, categoryId) => {
    const sqlQuery = `
      INSERT INTO workflows (id, name, category_id, created_at, updated_at)
      VALUES (?, ?, ?, NOW(), NOW())
      RETURNING *
    `
    const result = await db.raw(sqlQuery, [uuid, name, categoryId])
    return result.rows[0]
  },

  getWorkflows: async (workflowName, categoryId) => {
    let sqlQuery = `
    SELECT workflows.*, workflow_categories.name AS category_name, workflow_categories.color AS category_color, workflow_categories.icon AS category_icon
    FROM workflows
    JOIN workflow_categories ON workflows.category_id = workflow_categories.id
  `

    let filterParams = []
    if (workflowName) {
      sqlQuery += `WHERE workflows.name LIKE ? `
      filterParams.push(`%${workflowName}%`)
    }

    if (categoryId) {
      sqlQuery += workflowName ? 'AND ' : 'WHERE '
      sqlQuery += 'workflow_categories.id = ? '
      filterParams.push(categoryId)
    }

    const result = await db.raw(sqlQuery, filterParams)
    return result.rows
  },

  getSteps: async (id) => {
    const sqlQuery = `
      SELECT ws.*, CONCAT(appusers.first_name, ' ', appusers.last_name) AS assigned_user FROM workflow_steps ws
      INNER JOIN appusers ON ws.user_id = appusers.id
      WHERE workflow_id = ?
    `
    const result = await db.raw(sqlQuery, [id])
    return result.rows
  },
}
