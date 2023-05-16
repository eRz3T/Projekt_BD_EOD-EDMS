// Migracje pozwalają odtworzyć bazę danych (tabele) i utrzymać to w spójności
// W celu przeprowadzenia migracji w fodlerze /server odpalić w CMD komendę:
// npx knex migrate:latest

exports.up = async function (knex) {
  await knex.schema.createTable('appusers', (table) => {
    table.uuid('id').primary()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('role').defaultTo('user')
    table.timestamps(true, true)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('appusers')
}
