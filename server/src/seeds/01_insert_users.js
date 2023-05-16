const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')

exports.seed = async function (knex) {
  await knex('appusers').del()

  await knex('appusers').insert([
    {
      id: uuidv4(),
      email: 'test@email.com',
      password: bcrypt.hashSync('1qaz@WSX', 10),
      first_name: 'Jan',
      last_name: 'Kowalski',
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      email: 'test2@email.com',
      password: bcrypt.hashSync('1qaz@WSX', 10),
      first_name: 'Anna',
      last_name: 'Nowak',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      email: 'test3@email.com',
      password: bcrypt.hashSync('1qaz@WSX', 10),
      first_name: 'Dorota',
      last_name: 'Weltmajster',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}
