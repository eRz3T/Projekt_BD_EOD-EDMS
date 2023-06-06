exports.up = async function (knex) {
  await knex.schema.createTable('workflow_categories', (table) => {
    table.uuid('id').primary()
    table.string('name').notNullable().unique()
    table.string('color').notNullable()
    table.string('icon').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTable('workflow_categories')
}
