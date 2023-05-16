const { v4: uuidv4 } = require('uuid')

exports.seed = async function (knex) {
  const users = await knex('appusers').select('id')

  await knex('cases').del()

  await knex('cases').insert([
    {
      id: uuidv4(),
      assigned_user_id: users[1].id,
      created_by: users[0].id,
      title: 'Intrukcja obsługi chmury MS Azure',
      description: 'Przygotować instrukcję obsługi chmury MS Azure dla testerów manualnych',
      expires_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      assigned_user_id: users[1].id,
      created_by: users[0].id,
      title: 'Wniosek o dofinansowanie do węgla',
      description: 'Utworzyć i wypełnić wniosek o dofinansowanie do węgla',
      expires_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      assigned_user_id: users[2].id,
      created_by: users[0].id,
      title: 'Instrukcja obsługi MSTeams',
      description: 'Przygotować instrukcję obsługi MSTeams dla pracowników',
      expires_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      assigned_user_id: users[0].id,
      created_by: users[0].id,
      title: 'Protokół z posiedzenia zarządu',
      description: 'Zebrać informacje oraz przygotować protokół z posiedzenia zarządu',
      expires_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}
