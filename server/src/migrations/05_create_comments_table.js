exports.up = async function (knex) {
  await knex.schema.createTable('comments', (table) => {
    table.uuid('id').primary()
    table.uuid('case_id').unsigned().references('id').inTable('cases').onDelete('CASCADE')
    table.uuid('user_id').unsigned().references('id').inTable('appusers').onDelete('CASCADE')
    table.uuid('file_id').unsigned().references('id').inTable('files').onDelete('SET NULL')
    table.text('content').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('comments')
}
