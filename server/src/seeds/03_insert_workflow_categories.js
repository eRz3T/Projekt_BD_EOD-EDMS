const { v4: uuidv4 } = require('uuid')

exports.seed = async function (knex) {
  await knex('workflow_categories').del()
  await knex('workflow_categories').insert([
    {
      id: uuidv4(),
      name: 'Wnioski',
      color: '#74b9ff',
      icon: 'bxs-school',
    },
    {
      id: uuidv4(),
      name: 'Instrukcje',
      color: '#fd79a8',
      icon: 'bx-file',
    },
    {
      id: uuidv4(),
      name: 'Procedury',
      color: '#00cec9',
      icon: 'bx-list-check',
    },
  ])
}
