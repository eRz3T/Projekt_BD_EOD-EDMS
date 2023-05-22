import CreateEditWorkflowPath from '@/features/admin/workflows/createEditWorkflowPath/CreateEditWorkflowPath'
import CreateEditWorkflowStep from '@/features/admin/workflows/createEditWorkflowStep/CreateEditWorkflowStep'
import WorkflowList from '@/features/admin/workflows/workflowList/WorkflowList'

const Workflows = () => {
  return (
    <main className='bg-light min-h-[calc(100vh-76px)] pb-8'>
      <div className='mx-auto flex flex-row'>
        <section className='flex-[0.35]'>
          <WorkflowList />
        </section>
        <section className='flex-[0.35]'>
          <CreateEditWorkflowPath />
        </section>
        <section className='flex-[0.30]'>
          <CreateEditWorkflowStep />
        </section>
      </div>
    </main>
  )
}

export default Workflows
