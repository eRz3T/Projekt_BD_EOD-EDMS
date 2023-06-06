const { v4: uuidv4 } = require('uuid')

exports.seed = async function (knex) {
  const categories = await knex('workflow_categories').select('id')

  await knex('workflows').del()
  await knex('workflows').insert([
    {
      id: uuidv4(),
      name: 'Instrukcja dla pracowników biura',
      category_id: categories[1].id,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Protokoły biurowe',
      category_id: categories[2].id,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Wniosek o wydanie paszportu',
      category_id: categories[0].id,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}
