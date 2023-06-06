const knex = require('knex')
const config = require('../../knexfile').development
const db = knex(config)

module.exports = {
  createCategory: async (uuid, name, color, icon) => {
    const sqlQuery = `
      INSERT INTO workflow_categories (id, name, color, icon, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
      RETURNING *
    `
    const result = await db.raw(sqlQuery, [uuid, name, color, icon])
    return result.rows[0]
  },

  getAllCategories: async () => {
    const sqlQuery = `
      SELECT * FROM workflow_categories
    `
    const result = await db.raw(sqlQuery)
    return result.rows
  },

  updateCategory: async (id, updateData) => {
    return db('workflow_categories').where({ id }).update(updateData)
  },
}
