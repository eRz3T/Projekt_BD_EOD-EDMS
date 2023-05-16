exports.up = async function (knex) {
  await knex.schema.createTable('files', (table) => {
    table.uuid('id').primary()
    table.uuid('case_id').unsigned().references('id').inTable('cases').onDelete('CASCADE')
    table.uuid('user_id').unsigned().references('id').inTable('appusers').onDelete('CASCADE')
    table.string('filename').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('files')
}
