const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')

exports.seed = async function (knex) {
  await knex('appusers').del()

  await knex('appusers').insert([
    {
      id: uuidv4(),
      email: 'admin@email.com',
      password: bcrypt.hashSync('1qaz@WSX', 10),
      first_name: 'Jan',
      last_name: 'Kowalski',
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    },
    // {
    //   id: uuidv4(),
    //   email: 'test2@email.com',
    //   password: bcrypt.hashSync('1qaz@WSX', 10),
    //   first_name: 'Anna',
    //   last_name: 'Nowak',
    //   role: 'admin',
    //   created_at: new Date(),
    //   updated_at: new Date(),
    // },
    // {
    //   id: uuidv4(),
    //   email: 'test3@email.com',
    //   password: bcrypt.hashSync('1qaz@WSX', 10),
    //   first_name: 'Dorota',
    //   last_name: 'Weltmajster',
    //   created_at: new Date(),
    //   updated_at: new Date(),
    // },
    // {
    //   id: uuidv4(),
    //   email: 'test4@email.com',
    //   password: bcrypt.hashSync('1qaz@WSX', 10),
    //   first_name: 'Andrzej',
    //   last_name: 'Tomczyk',
    //   created_at: new Date(),
    //   updated_at: new Date(),
    // },
    // {
    //   id: uuidv4(),
    //   email: 'test5@email.com',
    //   password: bcrypt.hashSync('1qaz@WSX', 10),
    //   first_name: 'Paulina',
    //   last_name: 'Bednarska',
    //   created_at: new Date(),
    //   updated_at: new Date(),
    // },
    // {
    //   id: uuidv4(),
    //   email: 'test6@email.com',
    //   password: bcrypt.hashSync('1qaz@WSX', 10),
    //   first_name: 'Piotr',
    //   last_name: 'Kulczycki',
    //   created_at: new Date(),
    //   updated_at: new Date(),
    // },
    // {
    //   id: uuidv4(),
    //   email: 'test7@email.com',
    //   password: bcrypt.hashSync('1qaz@WSX', 10),
    //   first_name: 'Joanna',
    //   last_name: 'Shultz',
    //   created_at: new Date(),
    //   updated_at: new Date(),
    // },
  ])
}
