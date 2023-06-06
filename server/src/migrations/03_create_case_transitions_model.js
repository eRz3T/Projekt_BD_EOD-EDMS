exports.up = async function (knex) {
  await knex.schema.createTable('case_transitions', (table) => {
    table.uuid('id').primary()
    table.uuid('case_id').unsigned().references('id').inTable('cases').onDelete('CASCADE')
    table.uuid('from_user_id').unsigned().references('id').inTable('appusers').onDelete('CASCADE')
    table.uuid('to_user_id').unsigned().references('id').inTable('appusers').onDelete('CASCADE')
    table.timestamps(true, true)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('case_transitions')
}
