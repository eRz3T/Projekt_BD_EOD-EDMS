const knex = require('knex')
const config = require('../../knexfile').development
const db = knex(config)

module.exports = {
  createWorkflowStep: async (uuid, workflow_id, user_id, step_number, previous_step, action) => {
    const sqlQuery = `
      INSERT INTO workflow_steps (id, workflow_id, user_id, previous_step, step_number, action, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
      RETURNING *
    `
    const result = await db.raw(sqlQuery, [
      uuid,
      workflow_id,
      user_id,
      previous_step,
      step_number,
      action,
    ])
    return result.rows[0]
  },

  completeStep: async (caseId, workflowStepId) => {
    const sqlQuery = `
      UPDATE case_workflow_steps
      SET is_completed = true, updated_at = NOW()
      WHERE case_id = ? AND workflow_step_id = ?
    `
    await db.raw(sqlQuery, [caseId, workflowStepId])
  },

  revertStep: async (caseId, workflowStepId) => {
    const sqlQuery = `
      UPDATE case_workflow_steps
      SET is_completed = false, updated_at = NOW()
      WHERE case_id = ? AND workflow_step_id = ?
    `
    await db.raw(sqlQuery, [caseId, workflowStepId])
  },

  updateStep: async (id, data) => {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let setString = ''

    for (let i = 0; i < keys.length; i++) {
      if (i === keys.length - 1) {
        setString += `${keys[i]} = ?`
      } else {
        setString += `${keys[i]} = ?, `
      }
    }

    const updateStepQuery = `
      UPDATE workflow_steps
      SET ${setString}
      WHERE id = ?
    `

    values.push(id)

    await db.raw(updateStepQuery, values)

    const getUpdatedStepQuery = `SELECT * FROM workflow_steps WHERE id = ?`
    const updatedStep = await db.raw(getUpdatedStepQuery, [id])

    return updatedStep.rows[0]
  },

  deleteStep: async (id) => {
    // Pobierz krok, który ma zostać usunięty
    const stepToRemoveQuery = `SELECT * FROM workflow_steps WHERE id = ?`
    const stepToRemove = await db.raw(stepToRemoveQuery, [id]).then((res) => res.rows[0])

    // Zaktualizuj kroki, które miały "previous_step" ustawiony na usuwany krok
    const updateStepsQuery = `
      UPDATE workflow_steps
      SET previous_step = ?
      WHERE previous_step = ?
    `
    await db.raw(updateStepsQuery, [stepToRemove.previous_step, id])

    // Usuń krok
    const deleteStepQuery = `DELETE FROM workflow_steps WHERE id = ?`
    await db.raw(deleteStepQuery, [id])

    // Aktualizuj numery kroków
    const updateStepNumbersQuery = `
      WITH step_number_update AS (
        SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) AS new_step_number
        FROM workflow_steps
        WHERE workflow_id = ?
      )
      UPDATE workflow_steps
      SET step_number = step_number_update.new_step_number
      FROM step_number_update
      WHERE workflow_steps.id = step_number_update.id
    `
    await db.raw(updateStepNumbersQuery, [stepToRemove.workflow_id])
  },
}
