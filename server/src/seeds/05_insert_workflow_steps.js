const { v4: uuidv4 } = require('uuid')

exports.seed = async function (knex) {
  const workflows = await knex('workflows').select('id')
  const users = await knex('appusers').select('id')

  await knex('workflow_steps').del()

  // Pierwsza sciezka pierwszy krok
  const c1s1 = {
    id: uuidv4(),
    workflow_id: workflows[0].id,
    user_id: users[0].id,
    step_number: 1,
    previous_step: null,
    action: 'Prośba o rozpoczęcie sprawy',
  }
  await knex('workflow_steps').insert(c1s1)

  // Pierwsza sciezka drugi krok
  const c1s2 = {
    id: uuidv4(),
    workflow_id: workflows[0].id,
    user_id: users[1].id,
    previous_step: c1s1.id,
    step_number: 2,
    action: 'Utworzenie dokumentów',
  }
  await knex('workflow_steps').insert(c1s2)

  // Pierwsza sciezka trzeci krok
  const c1s3 = {
    id: uuidv4(),
    workflow_id: workflows[0].id,
    user_id: users[2].id,
    previous_step: c1s2.id,
    step_number: 3,
    action: 'Zatwierdzenie treści dokumentów',
  }
  await knex('workflow_steps').insert(c1s3)

  // Pierwsza sciezka czwarty krok
  const c1s4 = {
    id: uuidv4(),
    workflow_id: workflows[0].id,
    user_id: users[2].id,
    previous_step: c1s3.id,
    step_number: 4,
    action: 'Zlecenie wykonania paszportu',
  }
  await knex('workflow_steps').insert(c1s4)

  // Pierwsza sciezka piąty krok
  const c1s5 = {
    id: uuidv4(),
    workflow_id: workflows[0].id,
    user_id: users[3].id,
    previous_step: c1s4.id,
    step_number: 5,
    action: 'Wydanie paszortu petentowi',
  }
  await knex('workflow_steps').insert(c1s5)

  // Druga sciezka pierwszy krok
  const c2s1 = {
    id: uuidv4(),
    workflow_id: workflows[1].id,
    user_id: users[0].id,
    previous_step: null,
    step_number: 1,
    action: 'Prośba o rozpoczęcie sprawy',
  }
  await knex('workflow_steps').insert(c2s1)

  // Druga sciezka drugi krok
  const c2s2 = {
    id: uuidv4(),
    workflow_id: workflows[1].id,
    user_id: users[5].id,
    previous_step: c2s1.id,
    step_number: 2,
    action: 'Przygotowanie dokumentacji',
  }
  await knex('workflow_steps').insert(c2s2)

  // Druga sciezka trzeci krok
  const c2s3 = {
    id: uuidv4(),
    workflow_id: workflows[1].id,
    user_id: users[4].id,
    previous_step: c2s2.id,
    step_number: 3,
    action: 'Zatwierdzenie dokumentacji',
  }
  await knex('workflow_steps').insert(c2s3)

  // Druga sciezka czwarty krok
  const c2s4 = {
    id: uuidv4(),
    workflow_id: workflows[1].id,
    user_id: users[3].id,
    previous_step: c2s3.id,
    step_number: 4,
    action: 'Wysłanie dokumentacji do drukarni',
  }
  await knex('workflow_steps').insert(c2s4)

  // Druga sciezka piąty krok
  const c2s5 = {
    id: uuidv4(),
    workflow_id: workflows[1].id,
    user_id: users[1].id,
    previous_step: c2s4.id,
    step_number: 5,
    action: 'Załączenie instrukcji do folderu',
  }
  await knex('workflow_steps').insert(c2s5)

  // Trzecia sciezka pierwszy krok
  const c3s1 = {
    id: uuidv4(),
    workflow_id: workflows[2].id,
    user_id: users[0].id,
    previous_step: null,
    step_number: 1,
    action: 'Prośba o rozpoczęcie sprawy',
  }
  await knex('workflow_steps').insert(c3s1)

  // Trzecia sciezka drugi krok
  const c3s2 = {
    id: uuidv4(),
    workflow_id: workflows[2].id,
    user_id: users[1].id,
    previous_step: c3s1.id,
    step_number: 2,
    action: 'Zebranie informacji na temat sprawy',
  }
  await knex('workflow_steps').insert(c3s2)

  // Trzecia sciezka trzeci krok
  const c3s3 = {
    id: uuidv4(),
    workflow_id: workflows[2].id,
    user_id: users[2].id,
    previous_step: c3s2.id,
    step_number: 3,
    action: 'Utworzenie protokołu z wydarzenia',
  }
  await knex('workflow_steps').insert(c3s3)

  // Trzecia sciezka czwarty krok
  const c3s4 = {
    id: uuidv4(),
    workflow_id: workflows[2].id,
    user_id: users[0].id,
    previous_step: c3s3.id,
    step_number: 4,
    action: 'Zatwierdzenie protokołu z wydarzenia',
  }
  await knex('workflow_steps').insert(c3s4)

  // Trzecia sciezka piąty krok
  const c3s5 = {
    id: uuidv4(),
    workflow_id: workflows[2].id,
    user_id: users[1].id,
    previous_step: c3s4.id,
    step_number: 5,
    action: 'Archiwizacja protokołu',
  }
  await knex('workflow_steps').insert(c3s5)
}
