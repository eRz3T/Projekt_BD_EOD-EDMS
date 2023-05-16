exports.up = async function (knex) {
  await knex.schema.createTable('cases', (table) => {
    table.uuid('id').primary()
    table
      .uuid('assigned_user_id')
      .unsigned()
      .references('id')
      .inTable('appusers')
      .onDelete('CASCADE')
    table.uuid('created_by').unsigned().references('id').inTable('appusers').onDelete('CASCADE')
    table.string('title').notNullable()
    table.text('description')
    table.timestamp('expires_at').nullable()
    table.timestamps(true, true)
  })
}
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('cases')
}
