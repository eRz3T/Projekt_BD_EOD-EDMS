exports.up = async function (knex) {
  await knex.schema.createTable('workflows', (table) => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table
      .uuid('category_id')
      .unsigned()
      .references('id')
      .inTable('workflow_categories')
      .onDelete('SET NULL')
    table.timestamps(true, true)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('workflows')
}
