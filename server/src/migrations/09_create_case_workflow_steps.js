exports.up = async function (knex) {
  await knex.schema.createTable('case_workflow_steps', (table) => {
    table.uuid('id').primary()
    table.uuid('case_id').references('id').inTable('cases').onDelete('CASCADE')
    table.uuid('workflow_step_id').references('id').inTable('workflow_steps').onDelete('CASCADE')
    table.boolean('is_completed').defaultTo(false)
    table.timestamps(true, true)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('case_workflow_steps')
}
