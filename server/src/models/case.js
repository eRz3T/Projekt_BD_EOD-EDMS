const knex = require('knex')
const config = require('../../knexfile').development
const db = knex(config)

module.exports = {
  // Scenario 1: Create a new case only
  createCase: async (uuid, assignedUserId, createdBy, title, description, expiresAt) => {
    const sqlQuery = `
    INSERT INTO cases (id, assigned_user_id, created_by, title, description, expires_at, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    RETURNING *
  `
    const caseResult = await db.raw(sqlQuery, [
      uuid,
      assignedUserId,
      createdBy,
      title,
      description,
      expiresAt,
    ])
    return caseResult.rows[0]
  },

  // Scenario 2: Create a new case and assign workflow steps to it
  createCaseAndWorkflowSteps: async (
    uuid,
    assignedUserId,
    createdBy,
    title,
    description,
    expiresAt,
    workflowId
  ) => {
    const createCaseQuery = `
    INSERT INTO cases (id, assigned_user_id, created_by, title, description, expires_at, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    RETURNING id
    `
    const caseId = await db.raw(createCaseQuery, [
      uuid,
      assignedUserId,
      createdBy,
      title,
      description,
      expiresAt,
    ])
    const insertWorkflowStepsQuery = `
      INSERT INTO case_workflow_steps (id, case_id, workflow_step_id)
      SELECT uuid_generate_v4(), ?, id FROM workflow_steps WHERE workflow_id = ?
    `
    console.log(caseId.rows[0].id)
    console.log(workflowId)
    await db.raw(insertWorkflowStepsQuery, [caseId.rows[0].id, workflowId])
  },

  // Scenario 3: Assign workflow steps to existing case
  assignWorkflowStepsToCase: async (caseId, workflowId) => {
    const insertWorkflowStepsQuery = `
        INSERT INTO case_workflow_steps (case_id, workflow_step_id)
        SELECT ?, id FROM workflow_steps WHERE workflow_id = ?
    `
    await knex.raw(insertWorkflowStepsQuery, [caseId, workflowId])
  },

  updateAssignedUser: async (caseId, assignedUserId) => {
    const sqlQuery = `
    UPDATE cases
    SET assigned_user_id = ?, updated_at = NOW()
    WHERE id = ?
    RETURNING id, assigned_user_id
  `
    const updatedCaseResult = await db.raw(sqlQuery, [assignedUserId, caseId])
    return updatedCaseResult.rows[0]
  },
  getAllCases: async () => {
    const sqlQuery = `
    SELECT 
      DISTINCT cases.*, 
      CONCAT(assigned_user.first_name, ' ', assigned_user.last_name) as created_by_details, 
      workflows.id as assigned_workflow_id, 
      workflows.name as assigned_workflow_name
      FROM cases
      INNER JOIN appusers as assigned_user ON cases.created_by = assigned_user.id
      INNER JOIN case_workflow_steps ON case_workflow_steps.case_id = cases.id
      INNER JOIN workflow_steps ON case_workflow_steps.workflow_step_id = workflow_steps.id
      INNER JOIN workflows ON workflow_steps.workflow_id = workflows.id
      GROUP BY cases.id, assigned_user.id, workflows.id
    `

    const userCases = await db.raw(sqlQuery)
    return userCases.rows
  },
  getAllArchivedCases: async () => {
    const sqlQuery = `
    SELECT 
      DISTINCT cases.*, 
      CONCAT(assigned_user.first_name, ' ', assigned_user.last_name) as created_by_details, 
      workflows.id as assigned_workflow_id, 
      workflows.name as assigned_workflow_name
    FROM cases
    INNER JOIN appusers as assigned_user ON cases.created_by = assigned_user.id
    INNER JOIN case_workflow_steps ON case_workflow_steps.case_id = cases.id
    INNER JOIN workflow_steps ON case_workflow_steps.workflow_step_id = workflow_steps.id
    INNER JOIN workflows ON workflow_steps.workflow_id = workflows.id
    WHERE NOT EXISTS (
      SELECT 1 FROM case_workflow_steps as cws2
      WHERE cws2.case_id = cases.id AND cws2.is_completed = false
    )
    GROUP BY cases.id, assigned_user.id, workflows.id
  `
    const archivedCases = await db.raw(sqlQuery)
    return archivedCases.rows
  },
}
