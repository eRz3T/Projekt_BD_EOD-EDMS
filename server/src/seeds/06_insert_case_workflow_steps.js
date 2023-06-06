const { v4: uuidv4 } = require('uuid')

exports.seed = async function (knex) {
  const cases = await knex('cases').select('id')
  const workflows = await knex('workflows').select('id')
  let caseWorkflowStepsData = []

  for (let i = 0; i < cases.length; i++) {
    const caseId = cases[i].id
    const workflowId = workflows[i % workflows.length].id // cykliczne przypisywanie wokflow do case

    const workflowSteps = await knex('workflow_steps').select('id').where('workflow_id', workflowId)

    for (let step of workflowSteps) {
      caseWorkflowStepsData.push({
        id: uuidv4(),
        case_id: caseId,
        workflow_step_id: step.id,
        is_completed: false,
      })
    }
  }

  await knex('case_workflow_steps').insert(caseWorkflowStepsData)
}
