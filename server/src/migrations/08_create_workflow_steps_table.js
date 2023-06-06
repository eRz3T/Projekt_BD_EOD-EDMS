exports.up = async function (knex) {
  await knex.schema.createTable('workflow_steps', (table) => {
    table.uuid('id').primary()
    table.uuid('workflow_id').unsigned().references('id').inTable('workflows').onDelete('CASCADE')
    table.uuid('user_id').unsigned().references('id').inTable('appusers').onDelete('CASCADE')
    table.uuid('previous_step').unsigned().references('id').inTable('workflow_steps')
    table.integer('step_number').notNullable()
    table.string('action').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('workflow_steps')
}
